import React from 'react';
import { Svg, Path, Circle, G } from 'react-native-svg';

const AddCommentIcon = ({ size = 24, color = '#fff' }) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Comment Bubble */}
    <Path
      d="M4 17.2C4 15.2 4 14.2 4.8 13.5C5.6 12.8 7 12.8 11.2 12.8H12.8C17 12.8 18.4 12.8 19.2 13.5C20 14.2 20 15.2 20 17.2C20 18.2 20 18.8 19.5 19.3C19 19.8 18.2 19.8 16.2 19.8H12L7.5 22.2C7 22.4 6.4 22.2 6 21.8C5.8 21.4 5.8 21 6 20.8L7.2 19.8H6C4.8 19.8 4 19.6 4 17.2Z"
      stroke={'#fff'}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Plus Sign */}
    <G>
      <Circle cx="18" cy="6" r="4" fill={color} />
      <Path
        d="M18 4V8"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M16 6H20"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
  </Svg>
);

export default AddCommentIcon;
