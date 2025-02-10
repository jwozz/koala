// StatusViewer.js
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';

/**
 * Props:
 * - statuses: array of remote image URLs.
 * - duration: (optional) time in milliseconds each status is shown (default 5000)
 * - containerStyle: (optional) override container styling.
 */
const StatusViewer = ({ statuses, duration = 5000, containerStyle }) => {
  // Index of the current status
  const [currentIndex, setCurrentIndex] = useState(0);
  // Animated value used to fill the progress bar for the current status.
  const progress = useRef(new Animated.Value(0)).current;
  // Animated opacity for image fade‐in when changing statuses.
  const imageOpacity = useRef(new Animated.Value(0)).current;
  // Store a reference to the running progress animation so we can stop it if needed.
  const animationRef = useRef(null);
  // Measured width of the progress bars container
  const [progressContainerWidth, setProgressContainerWidth] = useState(0);

  // Helper: starts the progress animation (from 0 to 1) then auto‑advances.
  const startProgressAnimation = () => {
    progress.setValue(0);
    animationRef.current = Animated.timing(progress, {
      toValue: 1,
      duration,
      useNativeDriver: false, // width animation does not support native driver
    });
    animationRef.current.start(({ finished }) => {
      if (finished) {
        handleNext();
      }
    });
  };

  // When currentIndex changes, fade in the new image and start progress.
  useEffect(() => {
    // Restart the fade animation.
    imageOpacity.setValue(0);
    Animated.timing(imageOpacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    // Start progress bar animation.
    startProgressAnimation();

    // Clean up if component unmounts or before starting a new animation.
    return () => {
      if (animationRef.current) {
        animationRef.current.stop();
      }
    };
  }, [currentIndex]);

  // Called when user taps the right side (or auto‑advance finishes)
  const handleNext = () => {
    if (animationRef.current) {
      animationRef.current.stop();
    }
    if (currentIndex < statuses.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
    // Else: at last status—could optionally trigger an “onClose” callback here.
  };

  // Called when user taps the left side.
  const handlePrev = () => {
    if (animationRef.current) {
      animationRef.current.stop();
    }
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      // Optionally, restart the first status’s animation.
      progress.setValue(0);
      startProgressAnimation();
    }
  };

  // Compute the width of each progress bar segment once the container is measured.
  const progressBarWidth =
    progressContainerWidth > 0
      ? (progressContainerWidth - (statuses.length - 1) * 4) / statuses.length
      : 0;

  return (
    <View style={[styles.container, containerStyle]}>
      {/* Main image area (wrapped in an Animated.Image for fade transition) */}
      <Animated.Image
        source={{ uri: statuses[currentIndex] }}
        style={[styles.image, { opacity: imageOpacity }]}
        resizeMode="cover"
      />

      {/* Progress bars container */}
      <View
        style={styles.progressContainer}
        onLayout={(event) =>
          setProgressContainerWidth(event.nativeEvent.layout.width)
        }>
        {statuses.map((_, index) => {
          // For each segment, determine the fill width:
          // - Completed statuses are fully filled.
          // - The current one is animated.
          // - Upcoming statuses remain empty.
          let fillWidthStyle = {};
          if (index < currentIndex) {
            fillWidthStyle = { width: progressBarWidth };
          } else if (index === currentIndex) {
            fillWidthStyle = {
              width: progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, progressBarWidth],
                extrapolate: 'clamp',
              }),
            };
          } else {
            fillWidthStyle = { width: 0 };
          }
          return (
            <View key={index} style={styles.progressBarBackground}>
              <Animated.View
                style={[styles.progressBarForeground, fillWidthStyle]}
              />
            </View>
          );
        })}
      </View>

      {/* Touchable overlay: tap left for prev, right for next */}
      <View style={styles.touchableContainer}>
        <TouchableOpacity style={styles.leftTouchable} onPress={handlePrev} />
        <TouchableOpacity style={styles.rightTouchable} onPress={handleNext} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%', // fixed-size container (not fullscreen)
    height: 300,
    backgroundColor: '#000',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  progressContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 2,
  },
  progressBarBackground: {
    flex: 1,
    height: 2,
    backgroundColor: 'rgba(255,255,255,0.5)',
    marginHorizontal: 2,
  },
  progressBarForeground: {
    height: '100%',
    backgroundColor: '#fff',
  },
  touchableContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    zIndex: 3,
  },
  // Left half (prev) and right half (next) are transparent buttons.
  leftTouchable: {
    flex: 1,
  },
  rightTouchable: {
    flex: 1,
  },
});

export default StatusViewer;
