import React, { Component } from 'react';
import { View, StyleSheet, SafeAreaView, Dimensions, ActivityIndicator, TouchableOpacity, ImageBackground } from 'react-native';
import { Colors, Button, Text } from 'react-native-paper';
import { User, ReadUserData } from '../../Componoents/UserProfile';
import { Instructions } from '../Game/Instructions';
const { width, height } = Dimensions.get('screen');
import * as Animatable from 'react-native-animatable';
import Emoji from 'react-native-emoji';

class Main extends Component{
    constructor(props){
        super(props);
        console.log('*** Main Game Component ***');

        this.state = {
            visible: false,
            user: null,
            coins: 0,
            isLoading: true,
            isDialogVisible: false
        }
    }

    toggleDialog = () => this.setState({ visible: !this.state.visible })

    handleViewRef = ref => this.view = ref;

    setProfile = async () => {
        const user = await ReadUserData('Player/'); 
        this.setState({ user: user, isLoading: false }); 
    }

    async componentDidMount() {
        console.log('Main - componentDidMount function:');       
        if(this.state.user === null){
            const user = await ReadUserData('Player/'); 
            this.setState({ user: user, isLoading: false }); 
        }

        const { navigation } = this.props;
      this.focusListener = navigation.addListener('didFocus', () => {
      this.setProfile();
    });
    }

    watchPerformance = () => {//---
        this.props.navigation.navigate('Performance', {id: this.state.user})
    }

    render(){ 
        const { isLoading, user, visible } = this.state;
        if(isLoading){
            return (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size='large' color='#6646ee' />
                </View>)
        } else {
            return(      
                <ImageBackground source={require('../../Background/abstract-yellow-comic-zoom/923.jpg')} style={{width: '100%', height: '100%'}}>
                <SafeAreaView style={styles.container}>
                    <View style={styles.childContainer}>                       
                        <User user={user} onPress={() => this.props.navigation.navigate('Update', {sender: 'Game'})}/>                                                                           
                        <Button mode="contained"
                                compact={true}
                                style={styles.btn}
                                labelStyle={{ color: "white", fontSize: 20 }}
                                onPress={() => this.props.navigation.navigate('Waiting_Room', {user: user})}
                        >START GAME!</Button>
                        <Button mode="contained"
                                compact={true}
                                style={styles.btn}
                                icon='trophy-award'
                                labelStyle={{ color: "white", fontSize: 18 }}
                                onPress={() => this.props.navigation.navigate('Performance', {user: user})}
                        >Watch Performance</Button>

                        <View style={[styles.footer, {flexDirection: 'row'}]}>                            
                            <TouchableOpacity onPress={() => this.toggleDialog()} style={styles.inst}>
                                <Animatable.Text animation="rubberBand" easing="ease-out" iterationCount="infinite" style={[,{ fontSize: 20, textAlign: 'center' }]}>
                                <Emoji name="book" style={{fontSize: 50}} /> 
                                </Animatable.Text>
                            </TouchableOpacity>

                            <View style={styles.coins1}>
                                <Text style={styles.txt1}>{user.Coins}</Text>
                                <Animatable.Text animation="rotate" easing="ease-out" iterationCount="infinite" style={{ fontSize: 20, textAlign: 'center' }}>💰</Animatable.Text>           
                            </View>

                        </View>
                    </View>
                    <Instructions visible={visible} onPress={this.toggleDialog}/>                   
                </SafeAreaView>  
                </ImageBackground>  
            )
        }              
    }
}
export default Main;
const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingHorizontal: 10,
        flexWrap: 'wrap',
    },
    childContainer: {
        alignItems: 'center',
        flexWrap: 'wrap',
        height: height/1.3,
        justifyContent: 'space-evenly',
    }, 
    footer: {
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        alignItems: 'flex-end',
        width: width/1.1,
        flexDirection: 'row',
    }, 
    btn: {
        margin: 7,
        borderRadius: 6,
        borderColor: Colors.greenA700,
        borderWidth: 1,
        width: width/1.1,
        backgroundColor: '#00bfa5', 
    },
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    coins1: {
        alignSelf: 'flex-end',
        padding: 10,
        backgroundColor: Colors.purple500, 
        flexDirection: 'row',
        width: width / 4,
        justifyContent: 'space-around',
        borderRadius: 35,
    },
    txt1: {
        color: '#ffffff',
        fontSize: 20,
        fontWeight: "bold"
    },
    inst: {
        alignSelf: 'flex-start',
    },
})
