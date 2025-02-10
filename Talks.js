import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Image, ScrollView } from 'react-native';
import { MaterialIcons, Entypo, Ionicons, EvilIcons, Octicons } from '@expo/vector-icons';
import EmojiSelector from 'react-native-emoji-selector'; 
import InputContainer from './InputContainer';

const Talks = () => {
  const [inputText, setInputText] = useState('');
  const [isPickerVisible, setPickerVisible] = React.useState(false);
  const [expandedComments, setExpandedComments] = useState({});

  const inputRef = useRef(null);

  const toggleComments = (messageId) => {
    setExpandedComments((prev) => ({
      ...prev,
      [messageId]: !prev[messageId],
    }));
  };
  const [messages, setMessages] = useState([
    {
      id: '1',
      profileImage: 'data:image/jpeg;base64,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',
      title: 'Amazing Deals',
      threads: [
        {
          description: 'In response to Taylor Swifts, many are changin directions and thricing to the new rules..',
          images: [
            { uri: 'https://images.barrons.com/im-71214561', name: 'Artisan Bread', price: '$12' },
            { uri: 'https://cdn.wccftech.com/wp-content/uploads/2024/09/SPACEX-STARSHIP-FLIGHT-6-STATIC-FIRE-UPPER-STAGE-1456x970.jpeg', name: 'Cheese Platter', price: '$29' },
          ],
          emoji: '😍',
          emojiCount: '102',
          comments: [
            {
              profileImage: 'https://today-obs.line-scdn.net/0hcumWw7WXPFpQLi63VPpDDWh4MCtjSCZTckp6aSd5YT0oAnMJOUxvOXx9YXZ0HykPcE17OiJ6Y2N8SShZbA/w644',
              profileName: 'Hanon Swift',
              description: 'This is so amazing!',
            },
            {
              profileImage: 'https://www.reuters.com/resizer/v2/AKKHSGLGD5PPVGX6PDQWLIKHQ4.jpg?auth=86a54eaed81a43c2ecef6741609a6730b5232e738b34af92025f4498ff5fe4b1&width=3444&quality=80',
              profileName: 'Kim Doe',
              description: 'Loving the deals here.',
            },
            {
              profileImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReILAK2tsIF4CoKHHrXTH2WCbyN5rV4HLWcg&s',
              profileName: 'Martin Doe',
              description: 'Loving the deals here.',
            },
            {
              profileImage: 'https://fortune.com/img-assets/wp-content/uploads/2024/09/GettyImages-2170596573-e1727191861209.jpg?w=1440&q=75',
              profileName: 'Josetg Doe',
              description: 'Loving the deals here.',
            },
            {
              profileImage: 'https://i0.wp.com/health.umms.org/wp-content/uploads/2021/02/Black-women-health.png?fit=1200%2C800&ssl=1',
              profileName: 'Martin Doe',
              description: 'Loving the deals here.',
            },
            {
              profileImage: 'https://fortune.com/img-assets/wp-content/uploads/2024/09/GettyImages-2170596573-e1727191861209.jpg?w=1440&q=75',
              profileName: 'Josetg Doe',
              description: 'Loving the deals here.',
            },
          ],
          commentCount: '34',
          time: '26m',
        },
        {
          description: 'This is thread two for Amazing Deals.',
          images: [
            { uri: 'https://static01.nyt.com/images/2023/09/18/multimedia/Africa19-stillpromo/Africa19-YouthWave-1-flqt-mediumSquareAt3X-v2.jpg', name: 'Gaming Laptop', price: '$999' },
            { uri: 'https://www.nationalgeographic.com/content/dam/expeditions/destinations/africa/hero-africa-elephants.jpg', name: '4K Monitor', price: '$249' },
            { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoyCNy9U4-YQXdjQXsojb5-3ubIqBZV47oKg&s', name: 'Mechanical Keyboard', price: '$79' },
            { uri: 'https://ec.europa.eu/avservices/avs/files/video6/repository/prod/photo/store/store2/3/P058323-625039.jpg', name: 'Gourmet Coffee', price: '$15' },
          ],
          emoji: '😍',
          emojiCount: '555',
          comments: [
            {
              profileImage: 'https://api.time.com/wp-content/uploads/2023/09/Altman.jpg',
              profileName: 'Taylor West',
              description: 'This is so amazing!',
            },
            {
              profileImage: 'https://api.time.com/wp-content/uploads/2023/09/Altman.jpg',
              profileName: 'John Max',
              description: 'Loving the deals here.',
            },
          ],
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
          ],
          emoji: '😍',
          emojiCount: '102',
          comments: [
            {
              profileImage: 'https://api.time.com/wp-content/uploads/2023/09/Altman.jpg',
              profileName: 'Taylor Swift',
              description: 'This is so amazing!',
            },
            {
              profileImage: 'https://api.time.com/wp-content/uploads/2023/09/Altman.jpg',
              profileName: 'John Doe',
              description: 'Loving the deals here.',
            },
          ],
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
          comments: [
            {
              profileImage: 'https://api.time.com/wp-content/uploads/2023/09/Altman.jpg',
              profileName: 'Taylor Swift',
              description: 'This is so amazing!',
            },
            {
              profileImage: 'https://api.time.com/wp-content/uploads/2023/09/Altman.jpg',
              profileName: 'John Doe',
              description: 'Loving the deals here.',
            },
          ],
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
    const isExpanded = expandedComments[item.id] || false;
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
            <TouchableOpacity
              style={styles.comments}
              onPress={() => toggleComments(item.id)}
            >
              <View style={styles.line}></View>
              <Text style={styles.commentCountText}>
                {currentThreadData.commentCount} comments
              </Text>
              <MaterialIcons
                style={styles.commentDrop}
                name={isExpanded ? "arrow-drop-up" : "arrow-drop-down"}
              />
            </TouchableOpacity>

            {isExpanded && (
              <View style={styles.addComment}>
                <Image source="" style={styles.userAddComm} />
                <TextInput
                  onChangeText={setInputText}
                  ref={inputRef}
                  style={styles.commentInput}
                  value={inputText}
                  placeholder="Add a comment..."
                  placeholderTextColor="rgb(114, 114, 114)"
                  multiline={true}
                />
                <TouchableOpacity style={styles.sendButton}>
                  <Octicons name="arrow-up" style={[styles.sendButtonText, 
                    inputText.trim() !== '' && styles.sendButtonActive]} 
                  />
                </TouchableOpacity>
              </View> 
            )}
              {/* Render comments if expanded */}
              {isExpanded && (
                <ScrollView vertical showsVerticalScrollIndicator={false}
                 nestedScrollEnabled={true} 
                 style={styles.commentSection}>
                  <View style={styles.commentCover}>
                  {item.threads[0].comments.map((comment, index) => (
                    <View key={index} style={styles.commentContainer}>
                        <Image
                          source={{ uri: comment.profileImage }}
                          style={styles.commentProfileImage}
                        />
                      <View key={index} style={styles.commentBox}>
                        <View style={styles.commentContent}>
                          <Text style={styles.commentProfileName}>
                            {comment.profileName}
                          </Text>
                          <Text style={styles.commentDescription}>
                            {comment.description}
                          </Text>
                        </View>
                        <View style={styles.commentReactions}>
                          <View style={styles.reactB}>
                            <TouchableOpacity style={styles.commentReactBtn}>
                              <Text style={styles.replyTime}>2d</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.commentReactBtn}>
                              <Text style={styles.replyBtn}>Reply</Text>
                            </TouchableOpacity>
                          </View>
                            <TouchableOpacity style={styles.commentReactBtn}>
                              <Octicons name="heart" style={styles.commentHeartIcon} />
                              <Text style={styles.commentHeartCount}>10</Text>
                            </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  ))}
                  </View>
                </ScrollView>
              )}
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
    backgroundColor: '#121212', 
    paddingBottom: 55
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
    color: '#aaa',
  },
  postTitle: {
    fontSize: 14,
    color: '#aaa',
    fontWeight: '800',
    flex: 1,
  },
  followText: {
    color: '#aaa',
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
    marginRight: 5,
    alignItems: 'center',
  },
  carouselImage: {
    width: 80,
    height: 80,
    marginBottom: 10 ,
    marginTop: 5,
    borderRadius: 5,
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
    opacity: 0.8,
    marginRight: 5,
  },
  emojiText: {
    fontSize: 13,
    fontWeight: '400',
    color: '#aaa',
  },
  shareIcon: {
    fontSize: 17,
    color: '#aaa',
    marginLeft: 25,
  },
  pickerContainer: {
    position: 'absolute',
    bottom: 70, 
    width: '100%',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  threadCage: {
    justifyContent: 'space-between',
    flexDirection: 'column',
    width: '100%',
    marginTop: 10,
  }, 
  line: {
    width: 27 ,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    top: 1
  },  
  commentCountText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#aaa',
    marginLeft: 7,
  },
  commentDrop: {
    fontSize: 18,
    color: '#aaa',
    borderRadius: 100,
    marginLeft: 5,
    top: 2
  },  
  comments: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  commentSection: {
    maxHeight: 300,
    borderRadius: 10,
  },  
  addComment: {
    marginVertical: 10,
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'rgba(26, 26, 26, 0.0)',
    borderRadius: 10,
  },
  userAddComm: {
    width: 25,
    height: 25,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: 'rgb(145, 145, 145)',
    borderWidth: 3
  },
  commentInput: {
    color: 'white',
    width: '77%',
    fontWeight: '400',
    padding: 0
  },
  sendButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 35,
    width: 35,
    backgroundColor: 'rgb(19, 19, 19)',
    borderRadius: 50,
    display: 'none'
  },
  sendButtonText: {
    color: '#aaa',
    fontSize: 20,
  },
  sendButtonActive: {
    color: 'white',
  },
  commentText: {
    fontSize: 14,
    color: 'red',
  },
  commentContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
    marginRight: 35,
  },
  commentBox: {
    alignItems: 'flex-start',
  },
  commentProfileImage: {
    width: 25,
    height: 25,
    borderRadius: 20,
    marginRight: 10,
    top: 5
  },
  commentContent: {
    flex: 1,
  },
  commentProfileName: {
    fontWeight: '500',
    fontSize: 13,
    color: '#aaa',
    marginBottom: 2
  },
  commentDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 1)',
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
    color: '#aaa',
  },
  pageNumber: {
    fontSize: 11,
    fontWeight: '400',
    color: '#aaa',
    marginHorizontal: 10
  },
  commentReactions: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10
  },
  reactB: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  replyTime: {
    fontSize: 13,
    fontWeight: '400',
    color: '#aaa',
    marginRight: 30
  },
  replyBtn: {
    fontSize: 13,
    fontWeight: '400',
    color: '#aaa',
  },
  commentReactBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  commentHeartIcon: {
    fontSize: 18,
    fontWeight: '400',
    color: '#aaa',
    marginRight: 5
  },
  commentHeartCount: {
    fontSize: 13,
    fontWeight: '400',
    color: '#aaa',
  },

});

export default Talks;
