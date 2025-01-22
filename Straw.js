import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, ScrollView } from 'react-native';
import { MaterialIcons, Entypo, Ionicons, EvilIcons } from '@expo/vector-icons';
import EmojiSelector from 'react-native-emoji-selector'; 

const Straw = () => {
  const [isPickerVisible, setPickerVisible] = React.useState(false);
  const [messages, setMessages] = useState([
    {
      id: '1',
      profileImage: 'https://api.time.com/wp-content/uploads/2023/09/Altman.jpg',
      title: 'Amazing Deals',
      threads: [
        {
          description: 'In response to Taylor Swifts.',
          images: [
            { uri: 'https://api.time.com/wp-content/uploads/2023/09/Altman.jpg', name: 'Artisan Bread', price: '$12' },
            { uri: 'https://api.time.com/wp-content/uploads/2023/09/Altman.jpg', name: 'Cheese Platter', price: '$29' },
            { uri: 'https://api.time.com/wp-content/uploads/2023/09/Altman.jpg', name: 'Gourmet Coffee', price: '$15' },
          ],
          emoji: '😍',
          emojiCount: '102',
          comment: '',
          commentCount: '34',
          time: '26m',
        },
        {
          description: 'This is thread two for Amazing Deals.',
          images: [
            { uri: 'https://api.time.com/wp-content/uploads/2023/09/Altman.jpg', name: 'Artisan Bread', price: '$12' },
            { uri: 'https://api.time.com/wp-content/uploads/2023/09/Altman.jpg', name: 'Cheese Platter', price: '$29' },
            { uri: 'https://api.time.com/wp-content/uploads/2023/09/Altman.jpg', name: 'Gourmet Coffee', price: '$15' },
          ],
          emoji: '😍',
          emojiCount: '555',
          comment: '',
          commentCount: '66',
          time: '11m',
        },
      ],
      thread: 1,
    },
    {
      id: '2',
      profileImage: 'https://api.time.com/wp-content/uploads/2023/09/Altman.jpg',
      title: 'Davis Mikeson',
      threads: [
        {
          description: 'This is Davis.',
          images: [
            { uri: 'https://api.time.com/wp-content/uploads/2023/09/Altman.jpg', name: 'Artisan Bread', price: '$12' },
            { uri: 'https://api.time.com/wp-content/uploads/2023/09/Altman.jpg', name: 'Cheese Platter', price: '$29' },
            { uri: 'https://api.time.com/wp-content/uploads/2023/09/Altman.jpg', name: 'Gourmet Coffee', price: '$15' },
          ],
          emoji: '😍',
          emojiCount: '102',
          comment: '',
          commentCount: '34',
          time: '26m',
        },
        {
          description: 'Thread 2 for Davis.',
          images: [
            { uri: 'https://api.time.com/wp-content/uploads/2023/09/Altman.jpg', name: 'Artisan Bread', price: '$12' },
            { uri: 'https://api.time.com/wp-content/uploads/2023/09/Altman.jpg', name: 'Cheese Platter', price: '$29' },
            { uri: 'https://api.time.com/wp-content/uploads/2023/09/Altman.jpg', name: 'Gourmet Coffee', price: '$15' },
          ],
          emoji: '😍',
          emojiCount: '555',
          comment: '',
          commentCount: '66',
          time: '11m',
        },
      ],
      thread: 1,
    },
  ]);

  const totalThreads = 2; // Number of threads per user

  const handleNavigation = (direction, userId) => {
    setMessages((prevMessages) =>
      prevMessages.map((msg) => {
        if (msg.id === userId) {
          const currentThread = msg.thread || 1; // Default to 1 if not set
          let newThread;
          if (direction === 'left') {
            newThread = (currentThread - 1 + totalThreads) % totalThreads || totalThreads;
          } else if (direction === 'right') {
            newThread = (currentThread % totalThreads) + 1;
          }
          return { ...msg, thread: newThread };
        }
        return msg;
      })
    );
  };

  const renderMessage = ({ item }) => {
    // Get the current thread data for this message
    const currentThreadData = item.threads[item.thread - 1]; // Subtract 1 for zero-based indexing

    return (
      <View>
        <View style={styles.postCage}>
          <Image source={{ uri: item.profileImage }} style={styles.profileImage} />
          <View style={styles.postContainer}>
            <View style={styles.postHeader}>
              <View style={styles.profileView}>
                <Text style={styles.postTitle}>{item.title}</Text>
                <Text style={styles.timeText}>{currentThreadData.time}</Text>
              </View>
              <TouchableOpacity style={styles.followButton}>
                <Entypo style={styles.followText} name="dots-three-horizontal" />
              </TouchableOpacity>
            </View>
            <Text style={styles.postDescription}>{currentThreadData.description}</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.carousel}>
              {currentThreadData.images.map((image, index) => (
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
              <View style={styles.reactA}>
                <TouchableOpacity style={styles.reactionButton} onPress={() => setPickerVisible(true)}>
                  <Text style={styles.emojiIcon}>{currentThreadData.emoji}</Text>
                  <Text style={styles.emojiText}>{currentThreadData.emojiCount}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.reactionButton}>
                  <Ionicons style={styles.shareIcon} name="arrow-redo-outline" />
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.reactionButton}>
                <Text style={styles.commentText}>+ Follow</Text>
              </TouchableOpacity>
              <View style={styles.pageNavigation}>
                <TouchableOpacity style={styles.navButton} onPress={() => handleNavigation('left', item.id)}>
                  <EvilIcons name="chevron-left" style={styles.navButtonIcon} />
                </TouchableOpacity>
                <Text style={styles.pageNumber}>
                  {item.thread}/{totalThreads}
                </Text>
                <TouchableOpacity style={styles.navButton} onPress={() => handleNavigation('right', item.id)}>
                  <EvilIcons name="chevron-right" style={styles.navButtonIcon} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.threadCage}>
                <View style={styles.comments}>
                    <View style={styles.line}></View>
                    <Text style={styles.commentCountText}>{item.commentCount} comments</Text>
                    <MaterialIcons style={styles.commentDrop} name="arrow-drop-down" />
                </View>
            </View>
          </View>
        </View>
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
    paddingBottom: 0,
    backgroundColor: '#121212', 
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
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 25,
    top: 0,
  },
  postCage: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingRight: 15,
    marginTop: 20,
    marginBottom: 20,
  },
  postContainer: {
    borderRadius: 12,
    padding: 0,
    width: '85%',
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },  
  profileView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flex: 1
  },
  timeText: {
    fontSize: 13,
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 0.5)',
  },
  postTitle: {
    fontSize: 14,
    color: '#B3B3B3',
    fontWeight: '600',
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
    lineHeight: 21,
    marginBottom: 10
  },
  carousel: {
    marginLeft: 0,
  },
  carouselItem: {
    marginRight: 10,
    alignItems: 'center',
  },
  carouselImage: {
    width: 80,
    height: 80,
    marginBottom: 12,
    marginTop: 5,
    borderRadius: 10,
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
    width: '100%',
    paddingVertical: 0,
    borderWidth: 0,
    borderColor: 'rgba(27, 27, 27, 0.75)',
    backgroundColor: 'rgba(32, 32, 34, 0.0)',
    borderRadius: 0,
    bottom: 0,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOpacity: 0.1,
    shadowOffset: { width: 10, height: 10 },
    shadowRadius: 10,
    elevation: 0,
  },
  reactA: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reactionButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 0,
  },
  emojiIcon: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.5)',
    marginRight: 5,
  },
  emojiText: {
    fontSize: 13,
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 0.5)',
  },
  reactionCountText: {
    fontSize: 13,
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 0.5)',
  },
  shareIcon: {
    fontSize: 17,
    color: 'rgba(255, 255, 255, 0.5)',
    marginLeft: 25,
  },
  commentText: {
    fontSize: 13,
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 0.5)',
    marginLeft: 20,
    display: 'none'
  },
  quoteCountText: {
    fontSize: 13,
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 0.5)',
  },
  quoteIcon: {
    fontSize: 19,
    color: 'rgba(255, 255, 255, 0.5)',
    marginLeft: 10,
    marginRight: 3
  },
  pickerContainer: {
    position: 'absolute',
    bottom: 70, 
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
  threadCage: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 15,
    width: '100%',
  }, 
  comments: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  line: {
    width: 20,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    top: 1
  },  
  commentCountText: {
    fontSize: 13,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.5)',
    marginLeft: 7,
  },
  commentDrop: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 100,
    marginLeft: 5,
    top: 1
  },
  pageNavigation: {
    flexDirection: 'row', 
    justifyContent: 'center',
    alignSelf: 'flex-end',  
    alignItems: 'center',
    left: 8
  },
  navButton: {
    margin: 0,
    padding: 0,
  },
  navButtonIcon: {
    margin: 0,
    padding: 0,
    fontSize: 26,
    color: 'rgba(255, 255, 255, 0.5)',
  },
  pageNumber: {
    fontSize: 10,
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 10
  },

});

export default Straw;
