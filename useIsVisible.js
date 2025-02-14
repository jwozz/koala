// useIsVisible.js
import { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';

export const useIsVisible = (ref, scrollY, threshold = 1) => {
  const [isVisible, setIsVisible] = useState(false);

  const checkVisibility = () => {
    if (ref.current) {
      ref.current.measureInWindow((x, y, width, height) => {
        const windowHeight = Dimensions.get('window').height;
        // Calculate how much of the card is visible:
        // visibleHeight = portion of the card that lies between 0 and windowHeight
        const visibleHeight = Math.min(windowHeight, y + height) - Math.max(0, y);
        const fractionVisible = visibleHeight / height;
        // Set to true only if at least threshold (e.g., 80%) is visible.
        setIsVisible(fractionVisible >= threshold);
      });
    }
  };

  useEffect(() => {
    checkVisibility();
  }, [scrollY]); // re-check whenever scroll offset changes

  return isVisible;
};
