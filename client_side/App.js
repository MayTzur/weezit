import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View, AsyncStorage, YellowBox, StatusBar, Dimensions } from 'react-native';
import TabNavigator from './src/Navigation/NavigatorPage';
import * as Font from 'expo-font';
import LottieView from 'lottie-react-native';
import { Provider as PaperProvider ,Colors} from 'react-native-paper';
import DropdownAlert from 'react-native-dropdownalert';
import { AlertHelper } from './src/Componoents/Popup';
import { createUser, getData, updateToken } from './src/functions/checkUser';
const { width, height } = Dimensions.get('screen');
YellowBox.ignoreWarnings(['Setting a timer']);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      visible: false,
    };
  }//
  
  async componentDidMount() {
    console.log('componentDidMount function:');
    await Font.loadAsync({
      LondrinaSolid: require('./assets/fonts/LondrinaSolid-Regular.ttf')
    });
    
    const id = await getData();
    if(id === null){
      const res = await createUser();
      if(res){
        this.setState({ isReady: true});
      } else{
        console.log('ERROR: could not create this user');
      }
    } else {
      const res = await updateToken(id);
      if(res){
        this.setState({ isReady: true});
      }     
    }
  }// <ActivityIndicator size='large' color='#6646ee' />

  render() {

    if(!this.state.isReady){
      return (
      <View style={styles.loadingContainer}>
       
        <LottieView 
                        source={require('./src/Animations/4968-onboarding-account.json')} 
                        autoSize={true} 
                        autoPlay={true} 
                        loop={true} 
                        style={styles.animation}
                    />
      </View>)
    } else {
      return (
        <PaperProvider>
          
          <TabNavigator />                     
            <DropdownAlert
            defaultContainer={{ padding: 8, paddingTop: StatusBar.currentHeight, flexDirection: 'row' }}
            ref={ref => AlertHelper.setDropDown(ref)}
            onClose={() => AlertHelper.invokeOnClose()}
            />        
        </PaperProvider>              
      )
    }
  }    
}
export default App
/*<React.StrictMode>
          <React.StrictMode>*/
styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center",

  },
  animation: {
    //flexDirection: 'row',
    padding: 10,
    height: height/3,
    //borderColor: Colors.greenA700,
    //borderWidth: 1,
    //alignItems: 'center',
    width: width/1.2,
    //justifyContent: 'center',
},
  ContainerHome: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    
    backgroundColor: '#d4d4dc'
  },
  MainCard: {
    marginBottom: 50,

  },
  DownBtnImageMuch: {
marginBottom:50,
    backgroundColor: 'green',
  },
  CardQuestionGame : {

    height: '40%',
    flexDirection: "row",
    justifyContent: 'space-around',

  },
  GameScreenBtns:{
    height: '50%',
    flexDirection: "column",
    justifyContent: 'space-around',

  },
  downBoardGame_view:{
    flexDirection: "row",
    justifyContent: 'space-around',
    width:'90%'

  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  ContainerHome: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: '#d4d4dc'
  },
  MainCard: {
    marginBottom: 50,

  },
  DownBtnImageMuch: {
    marginBottom: 50,
    backgroundColor: 'green',
  },
  CardQuestionGame: {
    height: '40%',
    flexDirection: "row",
    justifyContent: 'space-around',
  },
  GameScreenBtns: {
    height: '50%',
    flexDirection: "column",
    justifyContent: 'space-around',
  },
  downBoardGame_view: {
    flexDirection: "row",
    justifyContent: 'space-around',
    width: '90%'

  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  //////////////////////start ImageMach style////////
  match_btn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  mach_btnArrow: {
    flexDirection: 'row',
    margin: 20,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  tlt: {
    color: '#4A90E2',
    fontSize: 24,
    padding: 10,
    fontWeight: 'bold',
  },

  Mach_txt: {
    fontSize: 10,
    fontWeight: 'bold',
  },

  mach_modal: {
    //justifyContent: 'space-evenly',
    flexDirection: 'column',
    alignItems: 'center',
    //fontSize: 25,
    //textAlign: 'center',
    flex: 1,
    padding: 10,
    //right: 0,
    //position: 'absolute'
  },

  message: {
    //justifyContent: 'center',
    alignItems: 'center',
    fontSize: 20,
    //right: 0,
    textAlign: 'center',
    padding: 10,
  },

  fixTo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    top: 180,
 alignItems:'center',
  },

  mess1: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#43A047'
  },

  mess2: {
    fontSize: 12,
    color: '#4A90E2',
    top:145//////////////////////only
  },


  mess3: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#C62828',
  },

  //////////////end of imageMach style//////////////////

  //////////////start of RevuewCard style////////////////

  paragraph: {
    textAlign: 'auto',
    fontSize: 16,
  },

  moreInfoIcons: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    top: 4
  },

  wikiBtn: {
    top: 3,
    left: 1,
  },

  titleREveiwCard: {
    fontWeight: 'bold',
    fontSize: 25,
    top: 7,
    right: 0,
    ///shon center/////
    textAlign: 'center',
    ///////end shon/////
    padding: 10,
    //alignItems: 'flex-end'
  },

  btnREveiwCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 0.1
  },

  txttxtREveiwCard: {
    fontSize: 20,
    fontWeight: 'bold',
    alignItems: 'center'
    ///////////////shon style
  },

  //////Takepic/////////////////////

  didYoyKnowModal: {
    backgroundColor: Colors.yellow600,
    alignSelf: 'center',
    width: width,
    height: height/3.6,
    justifyContent: 'center',
    alignItems: 'center',
    //paddingHorizontal: 20,
    flexWrap: 'wrap',
    borderRadius: 10,
    
    //paddingHorizontal: 10,
  },
downbtnModal: {
alignItems: 'flex-end',
marginTop: 20,
},
  didYoyKnowModalheadTxt: {
    color: Colors.cyan800,
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'serif',
  },

  didYoyKnowModaBodyText: {
    //marginTop: 20,
    fontSize: 15,
    color: Colors.cyan800,
    fontFamily: 'Roboto',
    textAlign:"center",
    alignItems:'center'
  },
  didYoyKnowModaBts: {       
    flexDirection: "row",
    justifyContent: 'space-around', 
  },
appName: {
    fontFamily: 'LondrinaSolid',
    color: '#393f4d',
    fontSize: 40,
    top: 15,
    margin: 25,
    bottom: 30
},
container: {
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
},
heading: {
    height: '8%',
    padding: '20px'
},
title: {
    color: '#393f4d',
    fontSize: 40,
    top: 15,
    margin: 25,
    bottom: 30
},
btn_row: {
    flexDirection: 'column',
    display: 'flex',
    justifyContent: 'center',
},





  ///////////takePic end/////////

})
