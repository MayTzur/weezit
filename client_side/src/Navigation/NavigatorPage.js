import React from 'react';
import {View} from 'react-native';
import { Linking } from 'expo';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { Octicons, SimpleLineIcons} from 'react-native-vector-icons';

//Home Folder
import Home from '../Screens/Home/Home';
import UpdateProfile from '../Screens/UpdateProfile';

//Game Folder
import Game from '../Screens/Game/Game';
import BoardGame from '../Screens/Game/BoardGame';
import Performance from '../Screens/Game/Performance';
import Main from '../Screens/Game/Main';
import GameOver from '../Screens/Game/GameOver';

import WaitingRoom from '../Screens/Game/WaitingRoom';
//Camera Folder
import Camera from '../Screens/Camera/TakePic';
import ImageMatch from '../Screens/Camera/ImageMatch';
import UploadImage from '../Screens/Camera/UploadImage';

const HomeStack = createStackNavigator({
    Home: { screen: Home},
    Update: {screen: UpdateProfile},
});

const CameraStack = createStackNavigator({
    Camera: { screen: Camera},
    Matches: { screen: ImageMatch},
    Upload: { screen: UploadImage}
});

const GameStack = createStackNavigator({
    Game: { screen: Main},
    Board: { screen: BoardGame, path:'game/:id/:key'},
    Performance: { screen: Performance},
    Your_Game: { screen: Game},
    Waiting_Room: { screen: WaitingRoom},
    Game_Over: { screen: GameOver}
});

GameStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
  };
};

const Navigator = createMaterialBottomTabNavigator({
    Home: { screen: HomeStack,
    navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Octicons style={[{color: tintColor}]} size={25} name={'home'} />
          </View>
        ),
      }
    },
    Camera: { screen: CameraStack, 
    navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <View>
            <SimpleLineIcons style={[{color: tintColor}]} size={25} name={'camera'} />
          </View> 
        ),
        activeColor: '#f0edf6',  
        inactiveColor: '#455a64', 
        barStyle: { backgroundColor: '#ffab00'},
      }
     },
    Game: { screen: GameStack,
        navigationOptions: {
          tabBarIcon: ({ tintColor }) => (
            <View>
              <SimpleLineIcons style={[{color: tintColor}]} size={25} name={'game-controller'} />
            </View>
          ),
          activeColor: '#f0edf6',  
          inactiveColor: '#455a64', 
          barStyle: { backgroundColor: '#00bfa5' },
        },
        path: 'game'
    },
    },
    {  
        initialRouteName: "Home",  
        activeColor: '#f0edf6',  
        inactiveColor: '#455a64',  
        barStyle: { backgroundColor: '#26c6da'}, 
        shifting: true,
        tabBarPosition: 'bottom',
        showIcon: true,
        showLabel: true
    });

    const TabNavigator = createAppContainer(Navigator);
    export default TabNavigator;


