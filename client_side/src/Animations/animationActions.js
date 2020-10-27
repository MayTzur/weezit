import React, { useState } from 'react';
import { Dimensions, StyleSheet, View, Modal, ViewPropTypes, Text } from 'react-native';
import { LottieAnimation, LottieView } from 'lottie-react-native';
import AnimatedLoader from 'react-native-animated-loader';
import await_animation from './await_animation.json';
import snak_loader from './snak_loader.json';

const WaitinAnimation = ({visible}) => {
    //const [visible, setVisible] = useState();
    return (
        <AnimatedLoader
          visible={visible}
          source={await_animation}
        />)
}
export default WaitinAnimation;



