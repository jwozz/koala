// ShopFront.js
import React, { useState, useRef } from 'react';
import { View, Text, Image, FlatList, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import ProductScreen from './ProductScreen';
import StatusViewer from './StatusViewer';

const screenWidth = Dimensions.get('window').width;

const shopData = [
  {
    id: '1',
    name: 'Shop One',
    profilePic:
      'https://images-na.ssl-images-amazon.com/images/I/71PvIY11X2L._UL500_.jpg',
  },
  {
    id: '2',
    name: 'Shop Two',
    profilePic:
      'https://images-na.ssl-images-amazon.com/images/I/71PvIY11X2L._UL500_.jpg',
  },
  {
    id: '3',
    name: 'Shop Three',
    profilePic:
      'https://images-na.ssl-images-amazon.com/images/I/71PvIY11X2L._UL500_.jpg',
  },
];

const statuses = [
  'https://picsum.photos/300/500?image=10',
  'https://picsum.photos/300/500?image=20',
  'https://picsum.photos/300/500?image=30',
];

const ProductsTab = () => (
  <ScrollView
    contentContainerStyle={styles.tabContent}
    showsVerticalScrollIndicator={false}
    nestedScrollEnabled={true}>
    <ProductScreen />
  </ScrollView>
);

const ShopCard = ({ shop, isActive }) => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'updates', title: 'Updates' },
    { key: 'products', title: 'Catalog' },
  ]);

  // We use a custom renderScene so we can pass the isActive flag (as isVisible)
  // to StatusViewer.
  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'updates':
        return (
          <View style={styles.tabContent}>
            <StatusViewer statuses={statuses} duration={5000} isVisible={isActive} />
          </View>
        );
      case 'products':
        return <ProductsTab />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.profileInfo}>
        <Image source={{ uri: shop.profilePic }} style={styles.profilePic} />
        <Text style={styles.shopName}>{shop.name}</Text>
      </View>
      <View style={styles.infoCage}>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
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
          style={styles.tabCage}
        />
      </View>
    </View>
  );
};

const ShopFronts = () => {
  // activeCardId will hold the id of the card that is at least 80% visible.
  const [activeCardId, setActiveCardId] = useState(null);

  // Configure viewability so that an item is considered "viewable" only if at least 80% is visible.
  const viewabilityConfig = {
    itemVisiblePercentThreshold: 80,
  };

  // onViewableItemsChanged is fired when the viewable items change.
  // Here, we simply choose the first viewable item as the active card.
  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems && viewableItems.length > 0) {
      setActiveCardId(viewableItems[0].item.id);
    }
  }).current;

  return (
    <FlatList
      data={shopData}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ShopCard shop={item} isActive={activeCardId === item.id} />
      )}
      contentContainerStyle={styles.container}
      onViewableItemsChanged={onViewableItemsChanged}
      viewabilityConfig={viewabilityConfig}
    />
  );
};

const styles = StyleSheet.create({
  container: {
  },
  card: {
    marginTop: 15,
    marginBottom: 15,
    marginHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 0,
    borderColor: 'rgba(34, 34, 34, 0.5)',
    backgroundColor: 'rgba(34, 34, 34, 0.5)',
    borderRadius: 10,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  profileInfo: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
    paddingHorizontal: 10,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 10,
    marginRight: 10,
  },
  infoCage:{
    width: '100%',
  },
  shopName: {
    fontSize: 14,
    fontWeight: '800',
    color: '#aaa',
  },
  tabCage: {
    height: 450,
    maxHeight: 450,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  tabBar: {
    backgroundColor: 'transparent',
    elevation: 0,
  },
  tabIndicator: {
    backgroundColor: 'rgb(255, 255, 255)',
    height: 1,
  },
  tabLabel: {
    fontSize: 20,
  },
  tabContent: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%',
    height: '100%',
  },
  tabText: {
    color: 'white',
  },
});

export default ShopFronts;
