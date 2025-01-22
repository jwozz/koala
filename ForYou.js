import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground, FlatList, Image, ScrollView } from 'react-native';
import { AntDesign, MaterialIcons, MaterialCommunityIcons, FontAwesome, Entypo, Octicons, Ionicons, FontAwesome6, Feather, SimpleLineIcons, Fontisto, Foundation } from '@expo/vector-icons';
import EmojiSelector from 'react-native-emoji-selector'; 
import axios from 'axios';

const API_URL = "http://192.168.100.5:8081/generate";

const ForYou = () => {
  const [isPickerVisible, setPickerVisible] = React.useState(false);
  const [messages, setMessages] = useState([
    { id: '1', text: 'Show me deals on Microsoft Office.', user: 'User' },
    { id: '2', text: 'Here are trending deals on Microsoft Office around you.', user: 'Bot' }, // Bot message
    {
      id: '3',
      type: 'post',
      profileImage: 'data:image/jpeg;base64,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',
      title: '~ amazingdeals',
      description: 'In response to Taylor Swifts.',
      images: [

      ],
      emoji: '😍', emojiCount: '16',
      commentCount: '34',
      notes: 'https://api.time.com/wp-content/uploads/2023/09/Altman.jpg',
      noteCount: '33'
    },
    {
      id: '4',
      type: 'post',
      profileImage: 'data:image/jpeg;base64,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',
      title: '~ elonmusk',
      description: 'Starship Next Gen Upper Stage Rocket Pops Up - Is Nothing Short Of A Work Of Art! Great Progress!',
      images: [
        { uri: 'https://images.barrons.com/im-71214561', name: 'Woolen Scarf', price: '$19' },
        { uri: 'https://cdn.wccftech.com/wp-content/uploads/2024/09/SPACEX-STARSHIP-FLIGHT-6-STATIC-FIRE-UPPER-STAGE-1456x970.jpeg', name: 'Leather Boots', price: '$89' },
      ],
      emoji: '👍', emojiCount: '722',
      commentCount: '129',
      notes: 'https://today-obs.line-scdn.net/0hcumWw7WXPFpQLi63VPpDDWh4MCtjSCZTckp6aSd5YT0oAnMJOUxvOXx9YXZ0HykPcE17OiJ6Y2N8SShZbA/w644',
      noteCount: '223'
    },
    {
      id: '5',
      type: 'post',
      profileImage: 'https://www.reuters.com/resizer/v2/AKKHSGLGD5PPVGX6PDQWLIKHQ4.jpg?auth=86a54eaed81a43c2ecef6741609a6730b5232e738b34af92025f4498ff5fe4b1&width=3444&quality=80',
      title: '~ billgates',
      description: 'Gates has shared updates about his upcoming book, "Source Code," about "Healthcare in Africa" set to release next year.',
      images: [
        { uri: 'https://static01.nyt.com/images/2023/09/18/multimedia/Africa19-stillpromo/Africa19-YouthWave-1-flqt-mediumSquareAt3X-v2.jpg', name: 'Gaming Laptop', price: '$999' },
        { uri: 'https://www.nationalgeographic.com/content/dam/expeditions/destinations/africa/hero-africa-elephants.jpg', name: '4K Monitor', price: '$249' },
        { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoyCNy9U4-YQXdjQXsojb5-3ubIqBZV47oKg&s', name: 'Mechanical Keyboard', price: '$79' },
      ],
      emoji: '❤️', emojiCount: '111',
      commentCount: '6',
      notes: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReILAK2tsIF4CoKHHrXTH2WCbyN5rV4HLWcg&s',
      noteCount: '8'
    },
    {
      id: '6',
      type: 'post',
      profileImage: 'https://fortune.com/img-assets/wp-content/uploads/2024/09/GettyImages-2170596573-e1727191861209.jpg?w=1440&q=75',
      title: '~ markzuckerberg',
      description: 'After an 11-year hiatus, Zuckerberg returned to Twitter in July 2023, posting a meme 🥱 featuring Spider-Man, coinciding with the launch of Metas Threads app.',
      images: [
        { uri: 'https://media.nature.com/lw1200/magazine-assets/d41586-024-00029-4/d41586-024-00029-4_26608470.jpg', name: 'Artisan Bread', price: '$12' },
        { uri: 'https://today-obs.line-scdn.net/0hcumWw7WXPFpQLi63VPpDDWh4MCtjSCZTckp6aSd5YT0oAnMJOUxvOXx9YXZ0HykPcE17OiJ6Y2N8SShZbA/w644', name: 'Cheese Platter', price: '$29' },
        { uri: 'https://ec.europa.eu/avservices/avs/files/video6/repository/prod/photo/store/store2/3/P058323-625039.jpg', name: 'Gourmet Coffee', price: '$15' },
      ],
      emoji: '❤️', emojiCount: '26',
      commentCount: '97',
      notes: 'https://i0.wp.com/health.umms.org/wp-content/uploads/2021/02/Black-women-health.png?fit=1200%2C800&ssl=1',
      noteCount: '13'
    },
  ]);

  const [inputText, setInputText] = useState('');
  const [response, setResponse] = useState('');

  const handleSend = async () => {
    if (inputText.trim()) {
      setMessages((prevMessages) => [
        { id: String(prevMessages.length + 1), text: inputText, user: 'User' },
        ...prevMessages,
      ]);
      setInputText('');

      try {
        const res = await axios.post(API_URL, { user_input: inputText });
        const botResponse = res.data.response;
        setResponse(botResponse);

        setMessages((prevMessages) => [
          { id: String(prevMessages.length + 1), text: botResponse, user: 'Bot' },
          ...prevMessages,
        ]);
      } catch (error) {
        console.error("Error fetching response:", error);
      }
    }
  };

  const renderMessage = ({ item }) => {
    if (item.type === 'post') {
      return (
        <View style={styles.postCage}>
          <Image source={{ uri: item.profileImage }} style={styles.profileImage} />
          <View style={styles.postContainer}>
            <View style={styles.postHeader}>
              <Text style={styles.postTitle}>{item.title}</Text>
              <TouchableOpacity style={styles.followButton}>
                <Entypo style={styles.followText} name='dots-three-vertical' />
              </TouchableOpacity>
            </View>
            <Text style={styles.postDescription}>{item.description}</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.carousel}>
              {item.images.map((image, index) => (
                <View key={index} style={styles.carouselItem}>
                  <Image source={{ uri: image.uri }} style={styles.carouselImage} />
                  <View style={styles.carouselText}>
                    <Text style={styles.carouselName}>{image.name}</Text>
                    <Text style={styles.carouselPrice}>{image.price}</Text>
                  </View>
                </View>
              ))}
            </ScrollView>
            <View style={styles.reactionsContainer}>
              <TouchableOpacity
                style={styles.reactionButton}
                onPress={() => setPickerVisible(true)}
              >
                <Text style={styles.emojiText}>{item.emoji}</Text>
                {/* <MaterialCommunityIcons style={styles.emojiText} name="emoticon-happy-outline" /> */}
                <Text style={styles.reactionCountText}>{item.emojiCount}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.reactionButton}>
                <Image source={{ uri: item.notes }} style={styles.notes} />
                <SimpleLineIcons style={styles.commentIcon} name="bubbles" />
                <Text style={styles.commentCountText}>{item.noteCount}</Text>
              </TouchableOpacity>
            </View>
            {isPickerVisible ? (
              <View style={styles.pickerContainer}>
                <EmojiSelector
                  onEmojiSelected={(emoji) => {
                    console.log(emoji);
                    setPickerVisible(false);
                  }}
                />
              </View>
            ) : null}
          </View>
          <View style={styles.forwardContainer}>
            <Ionicons style={styles.forwardIcon} name="arrow-redo-outline" />
          </View>
        </View>
      );
    }

    return (
      <View style={item.user === 'User' ? styles.userMessage : styles.botMessage}>
        <Text style={styles.messageText}>{item.text}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
        <View style={styles.cover} />
        <FlatList
            data={messages}
            renderItem={renderMessage}
            keyExtractor={(item) => item.id}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 55
  },
  cover: {
    paddingTop: 75
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#529c96',
    padding: 10,
    margin: 5,
    marginVertical: 10,
    borderRadius: 20,
    borderBottomRightRadius: 0,
    maxWidth: '80%',
    display: 'none'
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(0, 22, 32, 0.5)',
    padding: 10,
    marginHorizontal: 10,
    marginBottom: 10,
    borderRadius: 20,
    borderBottomLeftRadius: 0,
    maxWidth: '80%',
    display: 'none'
  },
  messageText: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 15,
    lineHeight: 21,
    fontWeight: '600',
  },
  postCage: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingLeft: 10,
    marginTop: 20,
  },
  forwardContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '10%',
  },
  forwardIcon: {
    fontSize: 17,
    color: 'rgba(255, 255, 255, 0.4)',
    backgroundColor: 'rgb(0, 41, 59)',
    padding: 5,
    borderRadius: 100
  },
  postContainer: {
    borderRadius: 12,
    marginBottom: 15,
    padding: 10,
    marginLeft: 5,
    maxWidth: '75%',
    backgroundColor: 'rgb(0, 41, 59)',
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  profileImage: {
    width: 30,
    height: 30,
    top: 5,
    borderRadius: 25,
  },
  postTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.7)',
    flex: 1,
  },
  followText: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 12,
  },
  postDescription: {
    fontSize: 15,
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 1)',
    lineHeight: 20,
  },
  carousel: {
    marginTop: 10,
    marginBottom: 0,
    borderRadius: 10,
    marginLeft: 0
  },
  carouselItem: {
    marginRight: 3,
    alignItems: 'center',
  },
  carouselImage: {
    width: 120,
    height: 120,
    backgroundColor: 'grey',
  },
  carouselText: {
    borderWidth: 1,
    borderTopWidth: 0,
    borderRadius: 10,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    width: '100%',
    padding: 7,
    display: 'none'
  },
  carouselName: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  carouselPrice: {
    fontSize: 14,
    color: '#5ba09a',
    fontWeight: 'bold',
  },
  reactionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 'auto',
    paddingHorizontal: 0,
    paddingTop: 4,
    paddingBottom: 4,
    borderWidth: 1,
    borderColor: 'rgba(0, 33, 48, 0.91)',
    backgroundColor: 'rgb(0, 41, 59)',
    borderRadius: 40,
    bottom: -25,
    marginLeft: 5,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOpacity: 0.1,
    shadowOffset: { width: 10, height: 10 },
    shadowRadius: 10,
    elevation: 5,
    zIndex: 55, 
    position: 'absolute',
  },
  reactionButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 9
  },
  emojiText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.5)',
  },
  commentButton: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginLeft: 15
  },

  reactionCountText: {
    fontSize: 12,
    marginLeft: 3,
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 0.5)',
  },
  commentIcon: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.5)',
  },
  commentCountText: {
    fontSize: 12,
    marginLeft: 5,
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 0.5)',
  },
  quoteIcon: {
    fontSize: 17,
    color: 'rgba(255, 255, 255, 0.5)',
  },
  pickerContainer: {
    position: 'absolute',
    bottom: 70, // Adjust based on your card height
    width: '100%',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  notes: {
    width: 18,
    height: 18,
    borderRadius: 50,
    opacity: 0.6,
    display: 'none'
  },

});

export default ForYou;
