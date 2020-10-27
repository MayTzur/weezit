import React, { Component, useEffect, useState } from 'react'
import { Text, View, StyleSheet} from 'react-native'
import * as Font from 'expo-font';

    const getTxt = (user) => {
        if(user == 0){
            return 'Oops! you dont have any win';
        } else if (user == 1) {
            return 'Nice beginning! you won in 1 game';
        }
        else {
            return `Yesss! you won in ${user} games`;
        }
    }

    const calculateTxt = (min, max) => {
        if(min == 1 && max == 1){
            return <Text style={styles.calculateTxt}>You only need one win to enter the list and be in the first place!</Text>;
        } else if(min == max && max > 1) {
            return <Text style={styles.calculateTxt}>{`To enter the list and also be in first place you need ${max} more wins`}</Text>;           
        } else if (min == 1) {
            return (
                <View>
                    <Text style={styles.calculateTxt}>{`To be in the first place you need ${max} wins`}</Text>
                    <Text style={styles.calculateTxt}>To enter the top list you need only one more win!</Text>
                </View>);
        } else {
            return (
                <View>
                    <Text style={styles.calculateTxt}>{`To be in the first place you need ${max} wins`}</Text>
                    <Text style={styles.calculateTxt}>{`To enter the top list you need more ${min} wins`}</Text>
                </View>);
        }
    }

const NotLeader = (props) => {
    console.log('NotLeader function:');
    console.log('props=', props);
    return (
        <View style={styles.notLeader}>
            <Text style={styles.txt}>{getTxt(props.user)}</Text>
            {calculateTxt(props.min, props.max)}
        </View>
  )
}

const TopFour = () => {
    console.log('CameraTitle function:');
    const [isFontReady, setFontReady] = useState(false)

    useEffect(() => {
      async function loadFont() {
        return await Font.loadAsync({
            MajorMonoDisplay: require('../../assets/fonts/Major_Mono_Display/MajorMonoDisplay-Regular.ttf'),
        });
      }
      
      loadFont().then(() => {
        setFontReady(true)
      });
      }, []);
  
    return (
      <View>
          {isFontReady && <Text
          style={styles.topFour}> Top Four Leaders: </Text>}
      </View>
  )
}

const CameraTitle = () => {
    console.log('CameraTitle function:');
    const [isFontReady, setFontReady] = useState(false)

    useEffect(() => {
      async function loadFont() {
        return await Font.loadAsync({
          'LondrinaSolid': require('../../assets/fonts/LondrinaSolid-Regular.ttf')
        });
      }
      
      loadFont().then(() => {
        setFontReady(true)
      });
      }, []);
  
    return (
      <View>
          {isFontReady && <Text
          style={{
              fontFamily:'LondrinaSolid',
              color: 'white', 
              fontSize: 40,
              paddingTop: 30,
              textAlign: 'center'
          }}> Who Is It ?! </Text>}
      </View>
  )
}

const InLeaders = () => {
    console.log('InLeaders function:');
    const [isFontReady, setFontReady] = useState(false)

    useEffect(() => {
      async function loadFont() {
        return await Font.loadAsync({
            Megrim: require('../../assets/fonts/Megrim/Megrim-Regular.ttf'),
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
              fontFamily:'Megrim',
              color: 'black', 
              fontSize: 30,
              textAlign: 'center'
          }}> You are in the top four </Text>}
      </View>
  )
}

const GoodJob = () => {
    console.log('GoodJob function:');
    const [isFontReady, setFontReady] = useState(false)

    useEffect(() => {
      async function loadFont() {
        return await Font.loadAsync({
          MajorMonoDisplay: require('../../assets/fonts/Major_Mono_Display/MajorMonoDisplay-Regular.ttf'),
        })
      }
      loadFont().then(() => {
        setFontReady(true)
      });
      }, []);
 
    return (
      <View>
          {isFontReady && <Text
          style={styles.goodJob}> Good Job! </Text>}
      </View>
  )
}

export { GoodJob, InLeaders, CameraTitle, TopFour, NotLeader }

const styles = StyleSheet.create({
    goodJob: {
        fontFamily:'MajorMonoDisplay',
        color: 'black', 
        fontSize: 40,
        textAlign: 'center'
    },
    topFour: {
        fontFamily:'MajorMonoDisplay',
        color: 'black', 
        fontSize: 40,
        paddingTop: 30,
        textAlign: 'center',
    },
    txt: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 25,
    },
    calculateTxt: {
        textAlign: 'center',
        fontSize: 20,
    },
    notLeader: {
        margin: 10,
    }
})