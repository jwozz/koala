import React, { useState, useEffect } from 'react';
import { View, StyleSheet, StatusBar, ImageBackground } from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';
import { useNavigation } from '@react-navigation/native';
import Feed from './Feed';

const Talks = () => {
  useEffect(() => {
    NavigationBar.setBackgroundColorAsync('#121212');
  }, []);

  const [activeMenuItem, setActiveMenuItem] = useState('For You'); 
  const navigation = useNavigation(); 

  return (
    <ImageBackground 
      source={require('./assets/images/b3.jpeg')} 
      style={styles.container}
    >
      <View style={styles.overlay} />

      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      <View style={styles.content}>
        <Feed />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: 'Poppins_400Regular',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgb(0, 28, 41)', 
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});

export default Talks;
