import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Straw from "./Straw";
import Deals from "./Deals";

const Tab = createMaterialTopTabNavigator();


const UpdatesScreen = () => (
  <View style={styles.screen}>
    <Text style={styles.text}>Updates Screen</Text>
  </View>
);

const TalksNav = () => {
  return (
    
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: { fontSize: 14, fontWeight: "bold" },
          tabBarStyle: { backgroundColor: "transparent" },
          tabBarIndicatorStyle: {
            height: 2,
            backgroundColor: "rgb(0, 143, 199)",
            alignSelf: "center",
          },
          tabBarActiveTintColor: "rgb(0, 143, 199)",
          tabBarInactiveTintColor: "rgba(218, 231, 255, 0.5)",
        }}
      >
        <Tab.Screen name="Share" component={Deals} />
        <Tab.Screen name="Talks" component={Straw} />
      </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default TalksNav;
