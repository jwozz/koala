// ShopCardStatusViewer.js
import React from 'react';
import { View } from 'react-native';
import { InView } from 'react-native-intersection-observer';
import StatusViewer from './StatusViewer';

const ShopCardStatusViewer = (props) => {
  return (
    <InView>
      {({ inView, ref }) => (
        <View ref={ref} style={{ flex: 1 }}>
          {/* Pass the visibility flag to StatusViewer */}
          <StatusViewer {...props} isVisible={inView} />
        </View>
      )}
    </InView>
  );
};

export default ShopCardStatusViewer;
