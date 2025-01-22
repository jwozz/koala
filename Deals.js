import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import DealsFilter from "./DealsFilter";
import InputContainer from "./InputContainer";
import ItemCard from "./ItemCard";


const Deals = () => {
  return (
    <View style={styles.container}>
        <ScrollView vertical showsVerticalScrollIndicator>
            <View style={styles.cover}>
                <View style={styles.ad}></View>
                <DealsFilter />
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
  cover: {
  },
  ad: {
    backgroundColor: 'rgb(24, 24, 24)',
    height: 150,
    marginHorizontal: 20,
    marginVertical: 20,
    marginBottom: 15,
    borderRadius: 15
  },
});

export default Deals;
