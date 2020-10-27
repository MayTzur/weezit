import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import LottieView from 'lottie-react-native';

const FireworksAnimation = (props) => {
    console.log('FireworksAnimation function:');
    console.log('props=', props);
    return (
        <LottieView source={require('./10087-welldone.json')} resizeMode="cover" autoPlay={props.autoPlay} loop={props.loop} />
    );
  };

  export { FireworksAnimation };
