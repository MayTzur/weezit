import React from 'react';
import { View, StyleSheet, ImageBackground, SafeAreaView, Dimensions, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
//import { Notifications, Linking } from 'expo';
import {firebase, db} from './Firebase';
import {  Colors } from 'react-native-paper';
import { FetchQuestion } from '../../functions/creator';
import { userState, gameState, deleteGame } from '../../functions/player';
import { Joining } from '../../functions/joiner';
import AwesomeAlert from 'react-native-awesome-alerts';
import { Icon } from 'react-native-elements';
import LottieView from 'lottie-react-native';
//import { Thumbnail } from 'native-base';
const { width, height } = Dimensions.get('screen');
const ref = db.ref('/games');
//let creatorRef = null;


class WaitingRoom extends React.Component {
    static navigationOptions = {
        headerShown: false,
    };
    constructor(props){   
        console.log('--- WaitingRoom Component ---');     
        super(props);      
        //this.timeout;
        this.gameRef;
        this.newGameRef;

        this.state ={
            isCreator: false,
            isReady: false,
            toStop: false,
            keysArr: [],
            oldKeys: [],
            indexKey: 0,
            currentKey: '',
            showAlert: false,
            titleAlert: '',
            msgAlert: '',
            colorAlert: '',
            user: props.navigation.state.params.user,
            creatorToken: ''
        }
    }

    componentDidMount(){// --- checked
        const { user } = this.props.navigation.state.params;
        console.log('user=', user);
        console.log('*** componentDidMount function ***');
        if(user !== undefined){
            console.log('user=', user);
            this.setState({ user: user},() => this.findGames())
        } else {
            this.props.navigation.navigate('Game');
        }
    }

    findGames = () => {// ---
        console.log('*** findGames function ***');
        try{
            let keys = [];
            let userId = this.state.user.ID;
            let oldKeys = this.state.oldKeys;
            const gameRef = ref.orderByChild('state').equalTo(gameState.waiting);
            
            gameRef
            .once('value')
            .then((snap) => {
                console.log('snap=', snap.val());
                if(snap.val() !== null){
                    snap.forEach((data) => {
                        if(userId !== data.val().creator.id && oldKeys.every((currentValue) => currentValue != data.key)){
                            console.log('data.key=', data.key);
                            keys.push(data.key)
                        }
                    })
                    if(keys.length === 0){//create
                        this.createGame();
                    } else {
                        this.setState({ keysArr: keys },() => this.joining())
                    }
                } else {//no games to join them at all - create game
                    this.createGame();
                }             
            })
        }
        catch(err){
            console.log('err=', err);
        }
    }

    joining = async () => {//
        console.log('*** joining function ***');
        const { keysArr, oldKeys, isCreator, user } = this.state;  
        let toStop = false;
        let currentIndex = 0;

        while(currentIndex < keysArr.length){
            let temp = oldKeys;
            temp.push(keysArr[currentIndex]);
            this.setState({oldKeys: temp});          
            toStop = await Joining(keysArr[currentIndex], user);
            console.log('toStop=', toStop)
            if(toStop){//true === success    
                this.props.navigation.navigate('Board', { id: user.ID, key: keysArr[currentIndex], isCreator: isCreator })           
                break;
            } else {
                currentIndex++;
            }
        }
        if(currentIndex === keysArr.length){
            this.setState({keysArr: [], indexKey: 0 },() => this.findGames());  
        }
    }

    goBack = () => { // --- checked       
        this.setState({ showAlert: true, colorAlert: Colors.red200, msgAlert: 'Are you sure you want to stop looking for a game?', titleAlert: 'Just in case,' })
    }

    createGame = async() => { // --- checked
        console.log('*** createGame function ***');
        const { user } = this.state;
        this.setState({ isCreator: true })
        const questions = await FetchQuestion();      
        const start = Date.now();

        try{
            const newGameRef = ref.push();            
            newGameRef.set({ 
                state: gameState.waiting,
                creator: { id: user.ID, username: user.UserName, image: user.Image, correctAns: 0, userState: userState.noComment, token: user.Token },
                joiner: {},
                questionsList: questions,
                round: { num: 0, creatorState: userState.await, joinerState: userState.await },
                creatingTime: start,
            })
            .catch((error) => { console.log('error ', error) })
            console.log('newKey: ',newGameRef.key);
             this.setState({ gameKey: newGameRef.key},() => this.listener());        
        }
        catch (error) {
            console.log('error ', error);
        }
    }

    onConfirm = () => {// ---
        const { gameKey, isCreator } = this.state;
        this.setState({ showAlert: false});
        if(isCreator){//remove game && go back
            deleteGame(gameKey);            
            this.props.navigation.navigate('Game');
        } else {
            this.props.navigation.navigate('Game');
        }
    }

    onCancel = () => {// ---
        this.setState({ showAlert: false});
    }

    childChangeEffect = () => {
        const { gameKey, user, isCreator } = this.state;
        this.gameRef.off();
        this.props.navigation.navigate('Board', { id: user.ID, key: gameKey, isCreator: isCreator })
    }

    listener = () => { // ---
        console.log('*** listener function ***');
        const { gameKey, user } = this.state;
        this.gameRef = ref.child(gameKey);
        this.gameRef.on('child_changed', (snap) => { //someone joined
            console.log('snap=', snap.node_.value_); 
            if(snap.key === 'state'){
                this.childChangeEffect();
            }
        })
    }

    render(){
        const {colorAlert, showAlert, msgAlert, titleAlert } = this.state;
        return(
            <ImageBackground source={require('../../Background/geometrical-halftone-dot-pattern-background-vector-design-from-circles-varying-sizes/1184.jpg')} style={{width: '100%', height: '100%'}}>
            <SafeAreaView style={[styles.container, styles.horizontal]}>
                <View style={styles.childContainer}>
                    <Text style={styles.textStyle}>Just a sec,{"\n"}{'\n'} we're searching a game for you{'\n'}...</Text>
                    
                    <LottieView 
                        source={require('../../Animations/22268-box-jumps.json')} 
                        autoSize={true} 
                        autoPlay={true} 
                        loop={true} 
                        style={styles.animation}
                    />

                    <TouchableOpacity style={styles.iconContainer} onPress={() => {this.goBack()}}>
                        <Text style={styles.txt}>BACK</Text>
                        <Icon
                            name='arrow-left-circle'
                            type='simple-line-icon'
                            color={Colors.greenA700}
                        />
                    </TouchableOpacity>                
                </View>

                <AwesomeAlert
                    show={showAlert}
                    showProgress={false}
                    title={titleAlert}
                    message={msgAlert}
                    closeOnTouchOutside={false}
                    closeOnHardwareBackPress={false}
                    showCancelButton={true}
                    showConfirmButton={true}
                    cancelText="No, Thanks"
                    confirmText="Yep!"
                    confirmButtonColor={colorAlert}
                    onCancelPressed={() => { this.onCancel()}}
                    onConfirmPressed={() => { this.onConfirm() }}
                />
            </SafeAreaView>
            </ImageBackground>
        )          
    }
}
export default WaitingRoom;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        paddingHorizontal: 10,
        flexWrap: 'wrap',
    },
    horizontal: {
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    txt: {
        alignItems: 'center',
        justifyContent: 'center',
        color: Colors.greenA700,
        fontSize: 20,
        marginHorizontal: 7,
    },
    iconContainer: {
        flexDirection: 'row',
        padding: 10,
        //borderRadius: 0,
        //borderColor: Colors.greenA700,
        //borderWidth: 1,
        alignItems: 'center',
        width: width/1.2,
        justifyContent: 'center',
    },
    textStyle: {
        textAlign: 'center',
        color: Colors.greenA700,
        fontSize: 30,
        fontWeight: "bold"
    },
    childContainer: {
        alignItems: 'center',
        flexWrap: 'wrap',
        marginHorizontal: 20,
        height: height/1.5,
        justifyContent: 'space-between',
    },
    animation: {
        padding: 10,
        height: height/3,
        width: width/1.2,
    },
})
