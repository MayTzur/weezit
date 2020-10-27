import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
//import { FontAwesome5, Entypo, } from '@expo/vector-icons';
//import { Text, Button, Card,Input} from 'react-native-elements';
//import {  } from '@expo/vector-icons';
//import Modal from 'react-native-modal';
//import {firebase, db} from './Firebase';
//import { storageKeys, save, read, deleteAll, deleteItem } from '../../Storage';
//import { searchWaitingGame, transAction, fetchQuestion, writeGameData } from './GameActions';
//import { postData } from '../../FetchData';
//import {takeQuestion} from './ListenGame';
import LottieView from 'lottie-react-native';
import TextAnimator from '../../Componoents/TextAnimator';
import Constants from 'expo-constants';
//MaterialCommunityIcons: account-edit - IconButton

//take photo from gallery: <MaterialIcons name="photo-library" size={24} color="black" />

//first place: <MaterialCommunityIcons name="podium-gold" size={24} color="black" /> 
//second place: <MaterialCommunityIcons name="podium-silver" size={24} color="black" />
//third place: <MaterialCommunityIcons name="podium-bronze" size={24} color="black" />
//const ref = db.ref();
//const STATE = {AWAIT: 1, READY: 2, GAME_OVER: 3, SWITCH: 4, ANSWERED: 5};
//const server = "http://proj.ruppin.ac.il/bgroup8/prod/serverSide/api";
let request = {
    method: 'GET',
    headers: new Headers({
        'Content-Type': 'application/json; charset=UTF-8'
    })
}
/*
    
        
    */
class Game extends Component {
    constructor(props) {
        super(props)
        console.log('Your_Game Screen!!!');
        //this.isCreator = props.navigation.state.params.data.isCreator;
        //this.key = props.navigation.state.params.key;

        this.state = {
            showAnimaTxt: true,
            showCounter: false,
            showGame: false,
            creator: {},
            joiner: {}
        }
    }

    componentDidMount(){
        //read data about players from realtime db + insert to this state
    }

    _onFinish = () => {
        this.setState({ showAnimaTxt: false, showCounter: true })
    };
//
//  
    render(){
        const { showAnimaTxt, showCounter, showGame } = this.state;
        if(showAnimaTxt){
            return(
                <View style={styles.containerTxt}>
                    <TextAnimator
                        content="Let's Play!"
                        textStyle={styles.textStyle}
                        style={styles.containerStyle}
                        duration={600}
                        onFinish={this._onFinish}
                    />
                </View>
            )
        } else if(showCounter){
            return(
                <View>
                    <LottieView source={require('../../Animations/4790-321go.json')} resizeMode="cover" autoPlay={true} loop={true} />
                </View>
            )
        } else if(showGame){
            return(
                <View>
                    
                </View>
            )
        }
        return (
            <View style={styles.container}></View>
        )
    };
}
export default Game;
styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    fixToText: {
        flexDirection: 'row',
        justifyContent: 'center',
        margin: 10
    },
    txt: {
        fontSize: 20,
        paddingRight: 10,
    },
    containerTxt: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#ecf0f1',
        padding: 8
    },
    containerStyle: {},
    textStyle: {
        fontSize: 28,
        fontWeight: 'bold',
        //fontFamily: 'Menlo',
        marginBottom: 14
    }
})