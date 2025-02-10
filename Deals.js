import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import DealsFilter from "./DealsFilter";
import ItemCard from "./ItemCard";
import ShopFront from "./ShopFronts";
import ProductScreen from "./ProductScreen";


const Deals = () => {
  return (
    <View style={styles.container}>
        <DealsFilter />
        <ScrollView 
        vertical 
        showsVerticalScrollIndicator>
            <View style={styles.cover}>
                <ShopFront />
                <ItemCard />
            </View>
        </ScrollView>
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
});

export default Deals;
