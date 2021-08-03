//Please add an common utility methods here
import React from 'react';
import { Dimensions, Platform, StatusBar } from 'react-native';

const commonUtil = {
  isDeviceHasNotch: () => {
    let result = false;
    const windowDimensions = Dimensions.get('window');
    if (Platform.OS === 'android' && StatusBar.currentHeight > 24) {
      result = true;
    }
    if (Platform.OS === 'ios' && !Platform.isPad && !Platform.isTVOS &&
      ((windowDimensions.height === 812 || windowDimensions.width === 812) || (windowDimensions.height === 896 || windowDimensions.width === 896))) {
      result = true;
    }
    return result;
  },

  trimString: (string) => {
    return string.replace(/^\s+|\s+$/g, '');
  },
};

export default commonUtil;
