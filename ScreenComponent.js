import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ScreenComponent = ({ route }) => (
  <View style={styles.container}>
    <Text style={styles.text}>{route.name} Screen</Text>
  </View>
);

export default ScreenComponent;
