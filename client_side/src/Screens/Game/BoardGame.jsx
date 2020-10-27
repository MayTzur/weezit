import React, { Component } from 'react';
import { View, StyleSheet, ActivityIndicator, Animated, Text, ImageBackground, SafeAreaView, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import { db } from './Firebase';
import Constants from 'expo-constants';
import { Colors, IconButton } from 'react-native-paper';
import { Avatar, Badge } from 'react-native-elements';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import { userState, deleteGame, getRandomInt, correctEmoji, mistakeEmoji, ifWon, gameState } from '../../functions/player';
import Emoji from 'react-native-emoji';
import AwesomeAlert from 'react-native-awesome-alerts';
import * as Animatable from 'react-native-animatable';
import { AlertHelper } from '../../Componoents/Popup';

const { width, height } = Dimensions.get('screen');
let ref = db.ref('/games');

class BoardGame extends React.Component {
    static navigationOptions = {
        headerShown: false,
      };
    
    constructor(props) {
        super(props)

        this.id = props.navigation.state.params.id;
        this.key = props.navigation.state.params.key;
        this.gameRef;
        this.otherPlayerRef;
        this.roundRef;
        this.isCreator = props.navigation.state.params.isCreator;
        this.state = {
            isReady: false,//update
            creator: null,
            joiner: null,
            index: 0, 
            display: 'none',
            bg: Colors.purple500,
            question: '',
            emojiName: '',
            counterKey: null,
            data: ['A', 'B', 'C'],
            isCreator: false,
            options: [],
            isWon: false,
            isPlaying: false,
            visibleDialog: true,
            c_status: 'primary',
            c_img: '',
            c_username: '',
            c_correct: 0,          
            j_status: 'primary',
            j_img: '',
            j_username: '',
            j_correct: 0,
            showAlert: false,
        }

    }

    componentDidMount(){
        const { key, id, isCreator } = this;
        const { index } = this.state;
        let d = {};
        let c = {};
        let j = {};    
        let c_img;
        let c_username;
        let j_img;
        let j_username;       

        const gameRef = ref.child(key);
        if(index === 0){       
            gameRef.once('value')
            .then((snap) => {
                snap.forEach((data) => {
                    switch(data.key){
                        case 'questionsList':
                            d = data.val();
                            break;
                        case 'creator':
                            c = data.val();
                            c_img = data.val().image;
                            c_username = data.val().username;                    
                            break;
                        case 'joiner':
                            j = data.val();
                            j_img = data.val().image;
                            j_username = data.val().username;
                            break;
                    }                   
                })
            }).then(() => {
                this.setState({ 
                    creator: c,
                    c_img: c_img, 
                    c_username: c_username,
                    joiner: j, 
                    j_img: j_img,  
                    j_username: j_username,
                    data: d,
                    options: d[index].options,
                    question: d[index].question,
                },() => this.waitingStation())
            }).catch((err) => {
                console.log('can not read realtime - can not start play=', err)
            })
        } 
    }

    waitingStation = () => {
        this.gameRef = ref.child(this.key);
        
        if(this.isCreator){
            ref.child(this.key + '/creator').update({ userState: userState.in});
            this.gameRef.child('joiner/userState')
            .once('value')
            .then((snap) => {
                if(snap.val() === userState.in){
                    ref.child(this.key).update({ state: gameState.ready});
                    this.gameRef.off();
                    this.setState({ isReady: true, isPlaying: true },() => this.gameListener());
                }else {
                    this.gameRef.on('child_changed', (snap) => {
                        if(snap.key === 'state' && snap.val() === gameState.ready){
                            this.gameRef.off();
                            this.setState({ isReady: true, isPlaying: true },() => this.gameListener());
                        }
                    })
                }
            })
        } else {
            ref.child(this.key + '/joiner').update({ userState: userState.in});
            this.gameRef.child('creator/userState')
            .once('value')
            .then((snap) => {
                if(snap.val() === userState.in){
                    ref.child(this.key).update({ state: gameState.ready});
                    this.gameRef.off();
                    this.setState({ isReady: true, isPlaying: true },() => this.gameListener());
                }else {
                    this.gameRef.on('child_changed', (snap) => {
                        if(snap.key === 'state' && snap.val() === gameState.ready){
                            this.gameRef.off();
                            this.setState({ isReady: true, isPlaying: true },() => this.gameListener());
                        }
                    })
                }
            })
        }
    }

    next = () => {
        const { index, data} = this.state;
        const i = index + 1;
        if(i < data.length){
            this.gameRef.child('round').update({ creatorState: userState.await, joinerState: userState.await, num: i})
            this.setState({
                index: i,
                emojiName: '', 
                disabled: false, 
                bg: Colors.purple500,
                options: data[i].options,
                question: data[i].question,
                c_status: 'primary',
                j_status: 'primary',
                display: 'none'
            })                                  
        } else {
            this.setState({ isPlaying: false })
            this.gameRef.child('round/num').remove();
        }
        
    }

    gameListener = () => {
        const { c_username, j_username, options, isCreator } = this.state;
        
        this.roundRef = this.gameRef.child('round');
        this.roundRef.on('child_changed', (snap) => { 

            if(snap.key === 'num'){
                this.next();
            } else {
                switch(snap.val()){
                    case userState.wrong:
                        if(snap.key === 'creatorState'){
                            this.setState({ c_status: 'error' })
                        } else {
                            this.setState({ j_status: 'error' })
                        }
                        break;
                    case userState.right:
                        if(snap.key === 'creatorState'){
                            this.setState({ c_status: 'success', c_correct: this.state.c_correct + 1 })
                        } else {
                            this.setState({ j_status: 'success', j_correct: this.state.j_correct + 1 })
                        }
                        break;
                }
            }
        })

        this.roundRef.on('child_removed', (snap) => {
            this.gameRef.off();
            this.gameOver();          
        })

        this.gameRef.on('child_removed', (snap) => {
            this.gameRef.off();        
            if(this.isCreator && snap.key == 'joiner'){
                AlertHelper.show('warn', 'warn', 'Looks like' + j_username + 'left the game sooooo....');
                this.setState({ j_correct: 0, c_correct: 1},() => this.gameOver());
            } else if(!this.isCreator && snap.key == 'creator'){
                AlertHelper.show('warn', 'warn', 'Looks like' + c_username + 'left the game sooooo....');
                this.setState({ j_correct: 1, c_correct: 0},() => this.gameOver());
            }
        })     
    }

    gameOver = () => {
        //console.log('*** gameOver ***')
        const { j_correct, c_correct, isCreator } = this.state;
        let isWon = ifWon(c_correct, j_correct, this.isCreator);        
        deleteGame(this.key);
        this.props.navigation.navigate('Game_Over', {isWon: isWon, userId: this.id})
    }

    leave = () => {
        //console.log('*** leave ***')
        this.setState({ showAlert: false });
        this.gameRef.off();

        if(this.isCreator){
            this.gameRef.child('creator').remove();
        } else {
            this.gameRef.child('joiner').remove()
        }
        this.props.navigation.navigate('Game');
    }

    exit = () => this.setState({ showAlert: true });

    onCancel = () => this.setState({ showAlert: false });

    checkAnswer = (a) => {
        //console.log('*** checkAnswer ***');
        const { key } = this;
        const { index, data, isCreator} = this.state;
        const { correct } = data[index];
        let i;
        let state;

        if(a == correct){
            i = getRandomInt(correctEmoji.length);
            this.setState({ emojiName: correctEmoji[i], disabled: true, bg: Colors.purple100, display: 'flex' })
            state = userState.right;
        } else{
            i = getRandomInt(mistakeEmoji.length);
            this.setState({ emojiName: mistakeEmoji[i], disabled: true, bg: Colors.purple100, display: 'flex'  })
            state = userState.wrong;
        }
        
        if(this.isCreator){
            ref.child(key + '/round').update({ creatorState: state})
        } else {
            ref.child(key + '/round').update({ joinerState: state})
        }
    }

    render() {
        const { isReady, index, options, display, disabled, bg, emojiName,  j_img, c_img, isPlaying, c_username, j_correct, c_correct, j_status, c_status,  overlay_bg, isOverlay, txtResult, question, showAlert} = this.state;
        
        if(!isReady){
            return(
                <ImageBackground source={require('../../Background/abstract-yellow-comic-zoom/923.jpg')} style={{width: '100%', height: '100%'}}>
                    <View style={styles.loadingContainer}>
                        <Text>Connecting Game...</Text>
                        <ActivityIndicator size='large' color='#6646ee' /> 
                    </View>
                </ImageBackground>               
            )
        } else {
            return (
                <ImageBackground source={require('../../Background/abstract-yellow-comic-zoom/923.jpg')} style={{width: '100%', height: '100%'}}>
                    <SafeAreaView style={styles.container}>
                        <Animatable.Text animation="pulse" easing="ease-out" iterationCount="infinite" style={[{ display: display }, styles.animatable]}>
                            <Emoji name={emojiName} style={{fontSize: 80}} />
                        </Animatable.Text>
                        <IconButton
                            icon="close"
                            style={{alignSelf:'flex-end'}}
                            color={Colors.red500}
                            size={35}
                            onPress={() => this.exit()}
                        />
                        <View style={styles.container1}>  
                        <Text style={styles.questionTxt}>{(index + 1) + ' / 10'}</Text>   
                        <Text style={styles.questionTxt}>{question}</Text>                      
                            {options.map((item) => {
                                return(
                                    <TouchableOpacity disabled={disabled}
                                        onPress={() => {this.checkAnswer(item)}}
                                        style={[styles.btn, {backgroundColor: bg, borderColor: bg}]}
                                    >
                                        <Text style={{ color: "white", fontSize: 20 }}>{item}</Text>
                                    </TouchableOpacity>
                                )
                            })}

                            <CountdownCircleTimer
                                key={index}
                                size={80}
                                strokeWidth={7}
                                isPlaying={isPlaying}
                                duration={15}
                                onComplete={() => {
                                    console.log('onComplete=')
                                    this.next();                             
                                    return [isPlaying, 1500] // repeat animation in 1.5 seconds
                                }}
                                colors={[['#004777', 0.33], ['#F7B801', 0.33], ['#A30000']]}>                                    
                                {({ remainingTime, animatedColor }) => (                                   
                                <Animated.Text
                                    style={{ ...styles.remainingTime, color: animatedColor }}>
                                    {remainingTime}
                                </Animated.Text>                               
                                )}
                            </CountdownCircleTimer>

                        <View style={styles.users}>
                        <Avatar
                            showAccessory={true}
                            size="large"
                            rounded
                            source={{uri: c_img}}
                        />
                        <Badge
                            value={c_correct}
                            status={c_status}
                            containerStyle={{ position: 'absolute', top: -4, right: 255 }}
                        />
                        
                        <Avatar
                            showAccessory={true}
                            size="large"
                            rounded
                            source={{uri: j_img}}
                        />
                        <Badge
                            value={j_correct}
                            status={j_status}
                            containerStyle={{ position: 'absolute', top: -4, right: 95 }}
                         />
                      
                        </View>
                        </View>

                        <AwesomeAlert
                            show={showAlert}
                            showProgress={false}
                            title='Whattttt?! 😧'
                            message='Do you really want to leave the game and lose?'
                            closeOnTouchOutside={false}
                            closeOnHardwareBackPress={false}
                            showCancelButton={true}
                            showConfirmButton={true}
                            cancelText="No, Cancel"
                            confirmText="Yes, let me go"
                            confirmButtonColor={Colors.red100}
                            onCancelPressed={() => { this.onCancel()}}
                            onConfirmPressed={() => { this.leave() }}
                        />                       
                    </SafeAreaView>
                </ImageBackground>
            )
        }
        
    }
}
    
const styles = StyleSheet.create({
    caption_j: {
        right: 95
    },
    caption_c: {
        right: 255
    },
    iconStyle: {
        alignSelf: 'flex-start'
    },
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
export default BoardGame;
