import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

const menuItems = [
  { name: "Talks", icon: "home" },
  { name: "Market", icon: "plus" },
];

const HomeNav = () => {
  const [activeTab, setActiveTab] = useState("Talks");
  const navigation = useNavigation(); // Hook for navigation

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Text style={styles.logoText}>Gogo</Text>
      </View>
      <View style={styles.navbar}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.navItems}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.name}
              style={[
                styles.navItemContainer,
                activeTab === item.name && styles.activeNavItemContainer,
              ]}
              onPress={() => {
                setActiveTab(item.name);
                navigation.navigate(item.name); // Use navigation hook to navigate
              }}
            >
              <Icon
                name={item.icon}
                color={activeTab === item.name ? 'rgb(233, 247, 255)' : 'rgba(255, 255, 255, 0.5)'}
                style={styles.icon}
              />
              <Text style={[styles.navItem, activeTab === item.name && styles.activeNavItem]}>
                {activeTab === item.name ? `• ${item.name}` : item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    marginTop: 40,
  },
  logoText: {
    color: 'white',
    padding: 10,
    paddingVertical: 5,
    fontSize: 18,
    fontWeight: '600',
    display: 'none',
  },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
    width: '100%',
  },
  navItems: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginLeft: 10,
    paddingBottom: 5,
  },
  navItemContainer: {
    alignItems: 'center',
    marginRight: 10,
    borderBottomWidth: 0,
    borderBottomColor: 'transparent',
  },
  activeNavItemContainer: {
    borderBottomWidth: 0,
    borderBottomColor: '#30a898',
  },
  navItem: {
    fontSize: 15,
    fontWeight: '400',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    color: 'rgba(255, 255, 255, 0.5)',
    backgroundColor: 'rgba(0, 28, 41, 0.0)',
    display: 'none'
  },
  activeNavItem: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 1)',
  },
  icon: {
    marginBottom: 5,
    fontSize: 22,
    marginHorizontal: 10
  },
});

export default HomeNav;
