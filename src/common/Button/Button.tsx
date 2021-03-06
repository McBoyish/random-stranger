import React from 'react';
import StyleSheet from 'react-native-media-query';
import { useTheme, ActivityIndicator } from 'react-native-paper';
import { Color, Font } from 'types';
import { useUserContext } from '../context/UserContext';
import {
	TouchableOpacity,
	Text,
	StyleProp,
	ViewStyle,
	TextStyle,
} from 'react-native';

interface ButtonProps {
	text: string;
	onClick: () => void;
	disabled?: boolean;
	loading?: boolean;
	containerStyle?: StyleProp<ViewStyle>;
	textStyle?: StyleProp<TextStyle>;
}

export default function Button({
	text,
	onClick,
	disabled,
	loading,
	containerStyle,
	textStyle,
}: ButtonProps) {
	const { userLoading } = useUserContext();

	const { color, font } = useTheme();
	const { styles } = styleSheet(color, font);

	return (
		<TouchableOpacity
			onPress={onClick}
			disabled={disabled || loading || userLoading}
			style={[styles.container, containerStyle]}
		>
			{loading && <ActivityIndicator color={color.secondary} size={'small'} />}
			{!loading && <Text style={[styles.label, textStyle]}>{text}</Text>}
		</TouchableOpacity>
	);
}

const styleSheet = (color: Color, font: Font) =>
	StyleSheet.create({
		container: {
			padding: 10,
			justifyContent: 'center',
			alignItems: 'center',
			borderRadius: 5,
			backgroundColor: color.primary,
			height: 50,
			width: 250,
		},

		label: {
			fontSize: font.size.secondary,
			fontFamily: font.family.text,
			color: color.secondary,
		},
	});
