import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Shops from "./Shops";
import Deals from "./Deals";
import Straw from "./Straw";

const Tab = createMaterialTopTabNavigator();

const UpdatesScreen = () => (
  <View style={styles.screen}>
    <Text style={styles.text}>Updates Screen</Text>
  </View>
);

const MarketNav = () => {
  return (
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: { fontSize: 14, fontWeight: "500" },
          tabBarStyle: { backgroundColor: '#121212',  },
          tabBarIndicatorStyle: {
            height: 1,
            backgroundColor: "rgba(236, 246, 255, 0.7)",
            alignSelf: "center",
          },
          tabBarActiveTintColor: "rgb(236, 246, 255)",
          tabBarInactiveTintColor: "rgba(218, 231, 255, 0.5)",
        }}
        >
        <Tab.Screen name="Inbox" component={Shops} />
        <Tab.Screen name="Deals" component={Deals} />
        <Tab.Screen name="For You" component={Straw} />
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

export default MarketNav;
