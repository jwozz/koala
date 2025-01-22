import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions, Animated
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const screenWidth = Dimensions.get("window").width;
const cardWidth = (screenWidth - 40) / 2;

const items = [
  {
    id: "1",
    name: "Wireless Headphones",
    price: "$120",
    date: "Jan 2, 2025",
    seller: {
      name: "John Doe",
      profilePic: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    images: [
      {
        uri: "https://www.phoneplacekenya.com/wp-content/uploads/2024/01/Sony-WH-CH500-Wireless-Headphones.jpg",
        name: "Sony Headphones",
        price: "$120",
      },
      {
        uri: "https://images-na.ssl-images-amazon.com/images/I/71PvIY11X2L._UL500_.jpg",
        name: "Noise-Canceling Headphones",
        price: "$150",
      },
    ],
  },
  {
    id: "2",
    date: "Jan 1, 2025",
    seller: {
      name: "Tessa Njeri",
      profilePic: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    images: [
      { 
        uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOl18Y12r_dBmzq4I1sgGWGw7cl9xmmK1l2A&s", 
        name: "Smartphone Abs", 
        price: "$699" 
      },
      { 
        uri: "https://www.ncccc.in/wp-content/uploads/2024/10/Nokia-Transparent-Smartphone.webp", 
        name: "Transparent Phone", 
        price: "$799" 
      },
    ],
  },
  {
    id: "3",
    date: "Dec 30, 2024",
    seller: {
      name: "Ken Rodgers",
      profilePic: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    images: [
      { 
        uri: "https://www.solepodiatry.com.au/wp-content/uploads/basketball-shoe-buying-guide-blog-m.jpeg", 
        name: "Basketball Shoes", 
        price: "$89" },
      { 
        uri: "https://riogiftshop.com/wp-content/uploads/2021/10/Mesh-Breathable-Comfy-Unisex-Sneaker-Shoes-11.jpg", 
        name: "Running Sneakers", 
        price: "$99" },
    ],
  },
];


const ItemCard = () => {
  const [animationStates, setAnimationStates] = useState(
    items.reduce((acc, item) => {
      acc[item.id] = { fadeAnim: new Animated.Value(1), showSeller: false };
      return acc;
    }, {})
  );
  const [currentIndexes, setCurrentIndexes] = useState({});

  useEffect(() => {
    const animateSequentially = () => {
      items.forEach((item, index) => {
        setTimeout(() => {
          setAnimationStates((prevStates) => {
            const fadeAnim = prevStates[item.id].fadeAnim;
            const showSeller = prevStates[item.id].showSeller;

            Animated.timing(fadeAnim, {
              toValue: 0,
              duration: 300, // Fade-out duration
              useNativeDriver: true,
            }).start(() => {
              // Toggle seller visibility after fade-out
              setAnimationStates((prevInnerStates) => ({
                ...prevInnerStates,
                [item.id]: { ...prevInnerStates[item.id], showSeller: !showSeller },
              }));

              // Fade-in the new content
              Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 600, // Fade-in duration
                useNativeDriver: true,
              }).start();
            });

            return prevStates;
          });
        }, index * 5000); // Delay each animation by 5 seconds per item
      });
    };

    animateSequentially();

    const interval = setInterval(() => {
      animateSequentially();
    }, items.length * 5000); // Restart animation after all items are done

    return () => clearInterval(interval);
  }, []);

  const onScroll = (itemId, event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / cardWidth);

    setCurrentIndexes((prevIndexes) => ({
      ...prevIndexes,
      [itemId]: index, // Update the index for the specific card
    }));
  };

  const renderCard = ({ item }) => {
    const { fadeAnim, showSeller } = animationStates[item.id];
    const currentIndex = currentIndexes[item.id] || 0; // Default to 0 if not set
    const currentImage = item.images[currentIndex]; // Get current image details

    const truncateText = (text, maxLength) => {
      return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
    };

    return (
      <View style={styles.card}>
        <FlatList
          data={item.images}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={(event) => onScroll(item.id, event)}
          renderItem={({ item: image }) => (
            <Image source={{ uri: image.uri }} style={styles.image} resizeMode="cover" />
          )}
          keyExtractor={(image, index) => `${item.id}-${index}`}
        />
        <View style={styles.pagination}>
          {item.images.map((_, index) => (
            <View
              key={index}
              style={[styles.dot, index === currentIndex ? styles.activeDot : null]}
            />
          ))}
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.name}>{truncateText(currentImage.name, 18)}</Text>
          <Text style={styles.price}>{currentImage.price}</Text>
          <View style={styles.footer}>
            <Animated.View style={{ opacity: fadeAnim }}>
              {showSeller ? (
                <View style={styles.sellerInfo}>
                  <Image
                    source={{ uri: item.seller.profilePic }}
                    style={styles.profilePic}
                  />
                  <Text style={styles.sellerName}>{item.seller.name}</Text>
                </View>
              ) : (
                <View style={styles.dateContainer}>
                  <MaterialIcons
                    name="location-on"
                    size={16}
                    color="#888"
                    style={styles.locationIcon}
                  />
                  <Text style={styles.date}>{item.date}</Text>
                </View>
              )}
            </Animated.View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={items}
      renderItem={renderCard}
      keyExtractor={(item) => item.id}
      numColumns={2}
      contentContainerStyle={styles.container}
      columnWrapperStyle={styles.row}
    />
  );
};



const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    marginBottom: 70,
  },
  row: {
    justifyContent: "space-between",
    marginHorizontal: 15,
  },
  card: {
    backgroundColor: "#121212",
    borderRadius: 15,
    overflow: "hidden",
    margin: 3,
    padding: 10,
    width: cardWidth,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: cardWidth - 20,
    height: cardWidth - 20,
    borderRadius: 10,
    marginRight: 1,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    marginHorizontal: 2,
  },
  activeDot: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  cardContent: {
    marginTop: 10,
  },
  name: {
    fontSize: 14,
    marginBottom: 5,
    color: "rgba(255, 255, 255, 0.5)",
  },
  price: {
    fontSize: 14,
    fontWeight: "bold",
    color: "rgba(255, 255, 255, 0.8)",
  },
  footer: {
    flexDirection: "row", 
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
  },  
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationIcon: {
    marginRight: 1,
    width: 15,
    marginRight: 5
  },
  date: {
    fontSize: 12,
    fontWeight: "300",
    color: "rgba(255, 255, 255, 0.5)",
  },
  sellerInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  profilePic: {
    width: 15,
    height: 15,
    borderRadius: 10,
    marginRight: 5,
  },
  sellerName: {
    fontSize: 12,
    fontWeight: "300",
    color: "rgba(255, 255, 255, 0.5)",
  },
});

export default ItemCard;
