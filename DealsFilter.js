import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";

const categories = [
  "Category",
  "Shops",
  "Browse",
  "Promos",
];

const DealsFilter = () => {
  const [activeCategory, setActiveCategory] = useState("Shops");

  const handleCategoryPress = (category) => {
    setActiveCategory(category);
    // Add logic for filtering or fetching deals here
    console.log(`Selected category: ${category}`);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleCategoryPress(category)}
            style={[
              styles.categoryItem,
              activeCategory === category && styles.activeCategoryItem,
            ]}
          >
            <Text
              style={[
                styles.categoryText,
                activeCategory === category && styles.activeCategoryText,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  scrollContainer: {
    paddingHorizontal: 5,
  },
  categoryItem: {
    paddingVertical: 5,
    paddingHorizontal: 12,
    backgroundColor: "#121212",
    borderRadius: 5,
    marginHorizontal: 5,
    backgroundColor: "rgb(31, 31, 31)",
  },
  activeCategoryItem: {
    backgroundColor: "rgb(54, 54, 54)",
  },
  categoryText: {
    fontSize: 13,
    fontWeight: '500',
    color: "#aaa",
  },
  activeCategoryText: {
    color: "#fff",
  },
});

export default DealsFilter;