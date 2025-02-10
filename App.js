import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import * as NavigationBar from 'expo-navigation-bar';
import Deals from "./Deals";
import Talks from "./Talks";
import Ionicons from "react-native-vector-icons/Ionicons";

const Tab = createMaterialTopTabNavigator();

const App = () => {
  useEffect(() => {
    NavigationBar.setBackgroundColorAsync('#121212');
  }, []);

  const showLabels = true;

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarLabelStyle: {
              fontSize: 16,
              fontWeight: "bold",
              paddingVertical: 0,
              display: showLabels ? "flex" : "none", 
            },
            tabBarStyle: {
              marginHorizontal: 100,
              marginTop: 30,
              backgroundColor: "rgb(0, 0, 0)",
            },
            tabBarItemStyle: {
              bottom: 0,
            },
            tabBarIndicatorStyle: {
              height: 1,
              alignSelf: "center",
              alignItems: "center",
              justifyContent: "center",
              width: 10,
              marginLeft: "22.5%",
              backgroundColor: "rgb(255, 255, 255)",
            },
            tabBarActiveTintColor: "white",
            tabBarInactiveTintColor: "#aaa",
            tabBarIcon: ({ color }) => {
              if (route.name === "Talks") {
                return <Ionicons name="home" size={20} color={color} style={{display: 'none'}} />;
              } else if (route.name === "Market") {
                return <Ionicons name="compass" size={20} color={color} style={{display: 'none'}} />;
              }
            },
          })}
        >
          <Tab.Screen name="Talks" component={Talks} />
          <Tab.Screen name="Market" component={Deals} />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(0, 0, 0)',
  },
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default App;
