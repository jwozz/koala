// ShopFront.js
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
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
      </View>
      <View style={styles.infoCage}>
        <Text style={styles.shopName}>{shop.name}</Text>
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
