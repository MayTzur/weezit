import React, { Component } from 'react';
import { View, StyleSheet, SafeAreaView, Dimensions, ImageBackground, ActivityIndicator, ScrollView  } from 'react-native';
import { InLeaders, GoodJob, TopFour, NotLeader } from '../../Componoents/Sentences';
import LottieView from 'lottie-react-native';
import { GetList } from '../../Componoents/GetList';
const { width, height } = Dimensions.get('screen');

class Performance extends React.Component {
    constructor(props){
        super(props);
        console.log('*** Performance Component ***');
        this.user = props.navigation.state.params.user
        this.state = {
            leaders: [],
            userWins: null,
            isLeader: false,
            firstPlace: null,
            enterList: null,
            isLoading: true,
            user: props.navigation.state.params.user
        }
    }

    componentDidMount = async () => { //---
        console.log('*** componentDidMount function ***');

        const { user } = this.props.navigation.state.params;
        console.log('user=', user);
        if(user !== undefined){
            console.log('user=', user);
            this.setState({ user: {ID: user.ID, UserName: user.UserName, Wins: user.Wins}},() => this.getLeaders())
        } else {
            this.props.navigation.navigate('Game');
        }
      }

      getLeaders = async () => {
          try{
            const path = `http://proj.ruppin.ac.il/bgroup8/prod/serverSide/api/User/Leaders`;
            const response = await fetch(path, {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json; charset=UTF-8'
                })
            })
            console.log('response=', response);
            const res = await Promise.resolve(response.json());
            console.log('res=', res);
            this.setState({ leaders: res},()=> this.calculate())
          }
          catch{
            console.log('ERROR: can not read leaders data=', err);
          }
      }

    calculate = () => {
        const { leaders, user } = this.state;
        const userId = user.ID;
        const ifLead = leaders.includes(user);
        console.log('ifLead=', ifLead)
        if(leaders.every((currentValue) => currentValue.ID != userId)){//outside the list
            const max = Math.max.apply(Math, leaders.map(function(o) { return o.Wins; }))
            const min = Math.min.apply(Math, leaders.map(function(o) { return o.Wins; }))
            this.setState({
                firstPlace: max - userWins,
                enterList: min - userWins,
                isLoading: false
            })
        } else {
            this.setState({
                isLeader: true,
                isLoading: false
            })
            
        }
    }

    render(){
        const { leaders, isLeader, firstPlace, enterList, userWins, isLoading, user} = this.state;
        if(isLoading){
            return (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size='large' color='#6646ee' />
                </View>)
        } else {
            if(isLeader){
                return (
                    <ImageBackground source={require('../../Background/geometrical-halftone-dot-pattern-background-vector-design-from-circles-varying-sizes/1184.jpg')} style={{width: '100%', height: '100%'}}>
                    <SafeAreaView style={styles.container}>
                    <TopFour/>
                    <ScrollView>
                        <GetList leaders={leaders} />
                    </ScrollView>                   
                    <LottieView source={require('../../Animations/10087-welldone.json')} resizeMode="cover" autoPlay={true} loop={false} />
                    <View style={styles.leaderContainer}>
                        <GoodJob/>
                        <InLeaders/>
                    </View>
                </SafeAreaView>   
                </ImageBackground>          
                  );
            } else if (!isLeader) {
                return (
                    <SafeAreaView style={styles.container}>
                    <TopFour/>
                    <ScrollView>
                        <GetList leaders={leaders} />
                    </ScrollView>
                    <NotLeader user={user.Wins} min={enterList} max={firstPlace}/>
                </SafeAreaView>             
                  ); 
            }
        }
             
    }   
}
export default Performance;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        alignContent: 'space-around',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
    },
    leaderContainer: {
        margin: 10,
    },
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})