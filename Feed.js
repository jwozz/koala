import React from 'react';
import { View, StyleSheet } from 'react-native';
import HomeNav from './HomeNav';
import Straw from './Straw';
import InputContainer from './InputContainer';



const Feed = () => {

  return (
    <View style={styles.container}>
      <HomeNav /> 
      <Straw />     
    < InputContainer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

});

export default Feed;
