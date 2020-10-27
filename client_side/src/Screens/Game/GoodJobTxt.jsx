import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import * as Font from 'expo-font';

export default function GoodJobTxt() {
  const [isFontReady, setFontReady] = useState(false)
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
            textAlign: 'center'
        }}> Good Job! </Text>}
    </View>
)
}
