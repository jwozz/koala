import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Animated, Easing } from 'react-native';
import { Entypo, EvilIcons, FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const InputContainer = () => {
  const [inputText, setInputText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const placeholders = ['Prompt...', 'Message...', '@mypost...'];

  const animatedValue = useRef(new Animated.Value(0)).current;
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const cyclePlaceholder = () => {
      if (inputText.trim() === '') { // Only cycle placeholder if input is empty
        Animated.timing(animatedValue, {
          toValue: 1, // Animate from 0 to 1
          duration: 0, // Total animation duration
          easing: Easing.ease,
          useNativeDriver: true,
        }).start(() => {
          // Reset animation value after completion
          animatedValue.setValue(0);
        });

        // Update text midway through the animation
        setTimeout(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % placeholders.length);
        }, 5000); // Midpoint of the 1000ms animation
      }
    };

    const interval = setInterval(cyclePlaceholder, 30000); // Change placeholder every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [animatedValue, inputText]);

  // Calculate interpolation values for sliding effect
  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0], // Placeholder remains static vertically
  });

  const opacity = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 0, 1], // Fade out and back in
  });

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <View style={styles.placeholderWrapper}>
            {inputText.trim() === '' && (
              <Animated.Text
                style={[
                  styles.placeholder,
                  {
                    transform: [{ translateY }],
                    opacity,
                  },
                ]}
              >
                {placeholders[currentIndex]}
              </Animated.Text>
            )}
          </View>
          <TextInput
            ref={inputRef}
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder=""
            multiline={true}
            caretColor="red"
          />
          <Ionicons name="attach-sharp"   style={[
            styles.searchIcon,
            inputText.trim() !== '' && styles.searchIconActive,
          ]} />
        </View>
        <TouchableOpacity style={[
          styles.newPost, 
          inputText.trim() !== '' && styles.newPostOut,]}>
          <MaterialCommunityIcons
            name={inputText.trim() !== '' ? 'arrow-up' : 'plus'} 
            style={styles.newPostBtn}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: 10,
    paddingVertical: 4
  },
  inputContainer: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '85%',
    borderRadius: 30,
    backgroundColor: 'rgb(41, 41, 41)',
    paddingVertical: 1.8
  },
  searchIcon: {
    fontSize: 25,
    borderRadius: 20, 
    color: 'rgba(255, 255, 255, 0.6)',
    padding: 5,
  },
  placeholderWrapper: {
    position: 'absolute',
    paddingLeft: 15,
    width: '100%',
    justifyContent: 'center',
  },
  placeholder: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontWeight: '500',
    fontSize: 15,
  },
  input: {
    flex: 1,
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 16,
    borderRadius: 10,
    fontWeight: '600',
    paddingLeft: 15,
  },
  newPost: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 46,
    height: 46,
    borderRadius: 100,
    backgroundColor: 'rgb(41, 41, 41)',
  },
  newPostBtn: {
    color: 'white',
    fontSize: 27,
  },
  newPostOut: {
    backgroundColor: 'rgb(0, 52, 77)',
  },
});

export default InputContainer;
