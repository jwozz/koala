import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const BottomNavigation = ({ navigation }) => {
  const menuItems = ['For You'];

  // Function to get the current active route name
  const getCurrentRouteName = () => {
    const state = navigation.getState();
    return state.routes[state.index].name;
  };

  // Set initial active screen on first load
  useEffect(() => {
    const initialRouteName = getCurrentRouteName();
    navigation.navigate(initialRouteName); // Ensure navigation is on the correct initial screen
  }, []);

  const renderBottomMenuItem = (item) => {
    const screenName = item === 'For You' ? 'ForYou' : item;
    const isActive = getCurrentRouteName() === screenName;

    return (
      <TouchableOpacity
        key={item}
        onPress={() => navigation.navigate(screenName)} // Navigate to the corresponding screen
        style={styles.bottomMenuItem}
      >
        <Text style={[styles.bottomMenuText, isActive ? styles.activeText : styles.inactiveText]}>
          {item}
        </Text>
        {isActive && <View style={styles.activeIndicator} />}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.bottomMenuContainer}>
      {menuItems.map(renderBottomMenuItem)}
    </View>
  );
};

const styles = StyleSheet.create({
  bottomMenuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    padding: 10,
  },
  bottomMenuItem: {
    flex: 1,
    alignItems: 'center',
  },
  bottomMenuText: {
    fontSize: 15,
  },
  activeText: {
    color: 'rgba(255, 255, 255, 0.7)', 
    fontWeight: 'bold',
  },
  inactiveText: {
    color: 'rgba(255, 255, 255, 0.3)',
    fontWeight: 'bold',
  },
  activeIndicator: {
    width: 10,
    height: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 2,
    marginTop: 4,
  },
});

export default BottomNavigation;

//uvicorn app:app --host 0.0.0.0 --port 8081 --reload