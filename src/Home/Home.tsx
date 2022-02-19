import React from 'react';
import { useTheme } from 'react-native-paper';
import { Color } from 'types';
import { View } from 'react-native';
import Form from './components/Form';
import StyleSheet from 'react-native-media-query';

export default function Home() {
  const { color } = useTheme();
  const { styles } = styleSheet(color);

  return (
    <View style={styles.container}>
      <Form />
    </View>
  );
}

const styleSheet = (color: Color) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignSelf: 'center',
      backgroundColor: color.background,
      width: '100%',
      padding: 20,
    },
  });
