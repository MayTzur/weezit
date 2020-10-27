import React from 'react';
import { StyleSheet, Dimensions, ImageBackground, View, SafeAreaView, ActivityIndicator } from 'react-native';
import Constants from 'expo-constants';
import { Text, Button } from 'react-native-paper';
const { width, height } = Dimensions.get('screen');
import { gameResult } from '../../functions/player';

class GameOver extends React.Component {
    static navigationOptions = {
        headerShown: false,
    };

    constructor(props){
        super(props);

        this.userId = props.navigation.state.params.userId;
        this.isWon = props.navigation.state.params.isWon;
        this.state = {
            isReady: false,
            background: '',
            txtResult: '',
        }
    }

    componentDidMount(){
        const { isWon, userId } = this;
        gameResult(userId, isWon);
        if(isWon){
            this.setState({
                txtResult:'Congratulations!\nYou are the winner of the game',
                isReady: true,
            })
        }  else {
            this.setState({
                txtResult:"It's not that bad ...\n maybe you will win next time",
                isReady: true,
            })
        }
    }

    render(){
        if(!this.state.isReady){
            return(
                <ImageBackground source={require('../../Background/abstract-yellow-comic-zoom/923.jpg')} style={{width: '100%', height: '100%'}}>
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size='large' color='#6646ee' /> 
                    </View>
                </ImageBackground>               
            )
        } else {
            if(this.isWon){
                return( 
                    <ImageBackground source={require('../../Background/big-win-surprise-banner-comic-style/17792.jpg')} style={{width: '100%', height: '100%'}}>
                        <SafeAreaView>
                            <Text>{this.state.txtResult}</Text>
                            <Button onPress={() => this.props.navigation.navigate('Game')}>CLOSE</Button>
                        </SafeAreaView>
                    </ImageBackground>
                )
            } else {
                return( 
                    <ImageBackground source={require('../../Background/lettering-oops-comic-text-sound-effects-yellow-background/464453-PFQ0PS-53.jpg')} style={{width: '100%', height: '100%'}}>
                        <SafeAreaView>
                            <Text>{this.state.txtResult}</Text>
                            <Button onPress={() => this.props.navigation.navigate('Game')}>CLOSE</Button>
                        </SafeAreaView>
                    </ImageBackground>
                )
            }
        }
       
    }
    
}
export default GameOver;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: Constants.statusBarHeight,
        paddingHorizontal: 10,
    },
    container1: {
        justifyContent: 'center',
        alignItems: 'center',
        width: width/1.1,
        borderRadius: 9,
        height: height/1.3,
        alignSelf: 'center',
    },
    users:{
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        flexDirection: 'row',
        width: width/1.1,
        height: height/9.2,
        alignSelf: 'flex-start',
    },
    remainingTime: {
        fontSize: 46,
    },
    animatable: {
        textAlign: 'center', 
        position: 'absolute',
        top: 10
    },
    optionBtn: {
        fontWeight:'bold',
        fontSize: 20
    },
    btn: {
        margin: 7,
        borderRadius: 6,
        borderWidth: 1,
        alignItems: 'center',
        width: width/1.3,
    },
    questionTxt: {
        fontWeight:'bold',
        margin: 12,
        fontSize: 19,
        textAlign: 'center',
    },
    questionCon: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#ecf0f1',
        width: width/1.1,
        borderRadius: 9,
        height: height/4,
        margin: 10,
    },
    title: {
        fontWeight:'bold',
        fontSize: 20
    },
    header: {
        backgroundColor: '#8fbc8f'
    },
    item: {
        color: '#000000',
        backgroundColor: '#8fbc8f'
    },
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    containerTxt: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#ecf0f1',
        padding: 8
    },
    textStyle: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 14
    }
  });
