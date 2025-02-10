import React, { useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import ProductScreen from './ProductScreen';
import StatusViewer from './StatusViewer';

const screenWidth = Dimensions.get('window').width;

const shopData = [
  { id: '1', name: 'Shop One', profilePic: 'https://images-na.ssl-images-amazon.com/images/I/71PvIY11X2L._UL500_.jpg' },
  { id: '2', name: 'Shop Two', profilePic: 'https://images-na.ssl-images-amazon.com/images/I/71PvIY11X2L._UL500_.jpg' },
  { id: '3', name: 'Shop Three', profilePic: 'https://images-na.ssl-images-amazon.com/images/I/71PvIY11X2L._UL500_.jpg' },
];

const statuses = [
  'https://picsum.photos/300/500?image=10',
  'https://picsum.photos/300/500?image=20',
  'https://picsum.photos/300/500?image=30',
];

const UpdatesTab = () => (
  <View style={styles.tabContent}>
    <StatusViewer statuses={statuses} duration={5000} />
  </View>
);

const ProductsTab = () => (
    <ScrollView
    vertical
    contentContainerStyle={styles.tabContent}
    showsVerticalScrollIndicator={false}
    nestedScrollEnabled={true}
  >
    <ProductScreen />
  </ScrollView>
);

const ShopCard = ({ shop }) => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'updates', title: 'Updates' },
    { key: 'products', title: 'Catalog' },
  ]);

  const renderScene = SceneMap({
    updates: UpdatesTab,
    products: ProductsTab,
  });

  return (
    <View style={styles.card}>
        <View style={styles.profileInfo}>
            <Image source={{ uri: shop.profilePic }} style={styles.profilePic} />
        </View>
        <View style={styles.infoCage}>
            <Text style={styles.shopName}>{shop.name}</Text>

            <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            style={styles.tabCage}
            initialLayout={{ width: screenWidth - 40 }} 
            renderTabBar={(props) => (
                <TabBar
                {...props}
                style={styles.tabBar}
                indicatorStyle={styles.tabIndicator}
                tabLabelStyle={styles.tabLabel}
                activeColor="rgb(255, 255, 255)" 
                inactiveColor="#aaa"
                />
            )}
            />
        </View>
    </View>
  );
};

const ShopFronts = () => (
  <FlatList
    data={shopData}
    keyExtractor={(item) => item.id}
    renderItem={({ item }) => <ShopCard shop={item} />}
    contentContainerStyle={styles.container}
    nestedScrollEnabled={true}
  />
);


const styles = StyleSheet.create({
  container: {
    marginLeft: 10
  },
  card: {
    paddingVertical: 5,
    marginTop: 15,
    marginBottom: 15,
    borderBottomWidth: 0,
    borderColor: 'rgba(34, 34, 34, 0.5)',
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  profileInfo: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 40,
  },
  infoCage:{
    marginLeft:10,
    width: '85%'
  },
  shopName: {
    fontSize: 14,
    fontWeight: '800',
    color: '#aaa',
  },
  tabCage: {
    height: 350,
    maxHeight: 350,
  },
  tabBar: {
    backgroundColor: 'transparent',
    elevation: 0,
  },
  tabIndicator: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    height: 1,
  },
  tabLabel: {
    fontSize: 20,
  },
  tabContent: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%',
  },
  tabText: {
    color: 'white',
    marginTop: 10
  },
});

export default ShopFronts;
