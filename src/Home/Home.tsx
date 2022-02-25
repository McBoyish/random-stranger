import React from 'react';
import { useTheme } from 'react-native-paper';
import { Color } from 'types';
import { View } from 'react-native';
import JoinRoomForm from './components/JoinRoomForm';
import CreateRoomForm from './components/CreateRoomForm';
import StyleSheet from 'react-native-media-query';
import { useBreakPoints } from 'utils/responsive';

export default function Home() {
	const { isMediumScreen } = useBreakPoints();
	const { color } = useTheme();
	const { styles } = styleSheet(color, isMediumScreen);

	return (
		<View style={styles.container}>
			<View style={styles.sectionContainer}>
				<View style={styles.formContainer}>
					<JoinRoomForm />
				</View>
				<View style={styles.formContainer}>
					<CreateRoomForm />
				</View>
			</View>
		</View>
	);
}

const styleSheet = (color: Color, isMediumScreen: boolean) =>
	StyleSheet.create({
		container: {
			flex: 1,
			alignSelf: 'center',
			backgroundColor: color.background,
			width: '100%',
			padding: 20,
		},

		sectionContainer: {
			justifyContent: 'space-around',
			flexDirection: isMediumScreen ? 'row' : 'column',
		},

		formContainer: {
			margin: 20,
		},
	});
