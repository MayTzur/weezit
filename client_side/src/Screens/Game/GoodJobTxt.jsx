import React, { Component, useEffect, useState } from 'react'
import { Text, View, StyleSheet} from 'react-native'
import * as Font from 'expo-font';

export default function GoodJobTxt() {
    console.log('GoodJobTxt function:');
  const [isFontReady, setFontReady] = useState(false)
//await Promise.resolve(...)
  useEffect(() => {
    async function loadFont() {
      return await Font.loadAsync({
        MajorMonoDisplay: require('../../../assets/fonts/Major_Mono_Display/MajorMonoDisplay-Regular.ttf'),
        Megrim: require('../../../assets/fonts/Megrim/Megrim-Regular.ttf'),
      })
    }
    loadFont().then(() => {
      setFontReady(true)
    });
    }, []);

  return (
    <View>
        {isFontReady && <Text
        style={{
            fontFamily:'MajorMonoDisplay',
            color: 'black', 
            fontSize: 40,
            //paddingTop: 30,
            textAlign: 'center'
        }}> Good Job! </Text>}
    </View>
)
}
