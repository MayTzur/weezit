import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import TextAnimator from '../../Componoents/TextAnimator';
import Constants from 'expo-constants';

class Game extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showAnimaTxt: true,
            showCounter: false,
            showGame: false,
            creator: {},
            joiner: {}
        }
    }

    _onFinish = () => {
        this.setState({ showAnimaTxt: false, showCounter: true })
    };

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
        marginBottom: 14
    }
})
