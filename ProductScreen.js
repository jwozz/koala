import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ScrollView } from 'react-native';

const products = [
  { id: '1', name: 'Jeans Trouser', price: 'Ksh100', image: 'https://images-na.ssl-images-amazon.com/images/I/71PvIY11X2L._UL500_.jpg' },
  { id: '2', name: 'Product 2', price: '$20', image: 'https://images-na.ssl-images-amazon.com/images/I/71PvIY11X2L._UL500_.jpg' },
  { id: '3', name: 'Product 3', price: '$30', image: 'https://images-na.ssl-images-amazon.com/images/I/71PvIY11X2L._UL500_.jpg' },
  { id: '4', name: 'Jeans Trouser', price: 'Ksh100', image: 'https://images-na.ssl-images-amazon.com/images/I/71PvIY11X2L._UL500_.jpg' },
  { id: '5', name: 'Product 2', price: '$20', image: 'https://images-na.ssl-images-amazon.com/images/I/71PvIY11X2L._UL500_.jpg' },
  { id: '6', name: 'Product 3', price: '$30', image: 'https://images-na.ssl-images-amazon.com/images/I/71PvIY11X2L._UL500_.jpg' },
];

const ProductScreen = () => {
  const renderProduct = ({ item }) => (
    <View style={styles.productCard}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.productDetails}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>{item.price}</Text>
        <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>+ Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScrollView nestedScrollEnabled={true} style={styles.container}>
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={renderProduct}
      contentContainerStyle={styles.productList}
    />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
  productCard: {
    borderRadius: 10,
    marginTop: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 5,
  },
  productDetails: {
    marginBottom: 5,
    marginLeft: 20,
    flexDirection: "column",
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  productName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#aaa',
  },
  productPrice: {
    fontSize: 14,
    color: 'rgb(255, 255, 255)',
    marginVertical: 10,
    fontWeight: 'bold',
  },
  addButton: {
    paddingVertical:4,
    paddingHorizontal: 12,
    backgroundColor: 'rgb(54, 54, 54)',
    borderRadius: 30,
  },
  addButtonText: {
    color: 'rgba(255, 255, 255, 1)',
    fontWeight: '500',
    fontSize: 13
  },
});

export default ProductScreen;
