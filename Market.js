import React from 'react';
import { View,  StyleSheet } from 'react-native';
import HomeNav from './HomeNav';

import MarketNav from './MarketNav';

const API_URL = "http://192.168.100.5:8081/generate";

const Market = () => {

  return (
    <View style={styles.container}>
      <HomeNav />
      <MarketNav />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',  
    paddingTop: 70
  },

});

export default Market;
