import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";

const categories = [
  "All",
  "Near by",
  "Offers",
  "Categories"
];

const DealsFilter = () => {
  const [activeCategory, setActiveCategory] = useState("All");

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
  },
  scrollContainer: {
    paddingHorizontal: 5,
    paddingLeft: 15
  },
  categoryItem: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: "#121212",
    borderRadius: 20,
    marginHorizontal: 5,
  },
  activeCategoryItem: {
    backgroundColor: "#00283a",
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '400',
    color: "rgba(255, 255, 255, 0.5)",
  },
  activeCategoryText: {
    color: "#fff",
  },
});

export default DealsFilter;