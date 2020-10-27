import React from 'react';
import { View, StyleSheet, YellowBox, ActivityIndicator, Dimensions, ImageBackground, SafeAreaView, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native';
import { User, ReadUserData } from '../../Componoents/UserProfile';
import { AlertHelper } from '../../Componoents/Popup';
import { Divider, Overlay, Text, Button  } from 'react-native-elements';
import AwesomeAlert from 'react-native-awesome-alerts';
import { Colors, IconButton, Headline } from 'react-native-paper';

YellowBox.ignoreWarnings(['Setting a timer']);
const { width, height } = Dimensions.get('screen');

class Home extends React.Component {
    constructor(props){
        super(props);

        this.state = { 
          isUpdate: props.navigation.getParam('isUpdate', false),
          user: null,
          showSnack: false,
          isLoading: true,
          key: '',
          action: '',
          counter: 0,
          message: null,
          oldSearceData: [],
          isOverlaylVisible: false,
          showAlert: false,
          u: null,
          i: null,
          headline: 'Your history search!'
        }
    }

    setProfile = async() => {
      const user = await ReadUserData('Profile/');
        this.setState({ 
          user: user, 
          }, () => this.getHistory());  
    }

    async componentDidMount() {  
      if(this.state.user === null){
        const user = await ReadUserData('Profile/'); 
        this.setState({ user: user},() => this.getHistory()); 
      }

      const { navigation } = this.props;
      this.focusListener = navigation.addListener('didFocus', () => {
      this.setProfile();
    });

    }

    getHistory =async () =>{
      try{
        const path = 'http://proj.ruppin.ac.il/bgroup8/prod/serverSide/api/User/SearchsList/' +  this.state.user.ID;

        const response = await fetch(path, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8'
            })
        })
        const res = await Promise.resolve(response.json());
        if(res === undefined){
          this.setState({
            headline: "You dont have any history yet...",
            isLoading: false 
          })
        } else {
          this.setState({
            oldSearceData: res,
            isLoading: false 
          })
        }
    }
    catch(err){
        AlertHelper.show('error', 'error', "Something went wrong... we can't get your history...\nTry later")
      }
    }

    toggleModal = (name, Biography) => {
      this.setState({
        isOverlaylVisible: !this.state.isOverlaylVisible,
        moreInfoName: name,
        moreInfoBiography: Biography
      })
    };
  
  
    deleteSearch = () => {
      const searcId = this.state.u;
      const path = 'http://proj.ruppin.ac.il/bgroup8/prod/serverSide/api/User/DeleteUserSearch/' + this.state.user.ID + '/' + searcId;
     
      fetch(path, {
        method: 'DELETE',
        headers: new Headers({
          'accept': 'application/json; charset=UTF-8' 
        })
      })
      .then(res => {
        if(!res.ok){
          AlertHelper.show('error', 'error', "Something went wrong... we can't delete your history...\nTry again")
        }
      })
      this.renderDelete(searcId)
    }
  
    displayAlert = (u) => this.setState({ showAlert: true, u: u })

    onCancel = () => {
      this.setState({ showAlert: false });
    }

    onConfirm = () => {
      this.setState({ showAlert: false });
      this.deleteSearch();
    }

    renderDelete = (id) => { 
      this.setState(prevSState => ({ oldSearceData: prevSState.oldSearceData.filter(x => x.ID !== id) }))
    }

    renderItem = ({ item }) => (
      <View style={styles.itemSearch}>
        <IconButton
            icon="delete-circle-outline"
            style={{alignSelf:'flex-end', right: -5}}
            color={Colors.red500}
            size={35}
            onPress={() => this.displayAlert(item.ID)}
        />
        
        <Button
          title={item.Name}
          type="clear"
          style={{alignSelf:'flex-end'}}
          onPress={() => this.toggleModal(item.Name, item.Biography)}
        />

         <Image
          style={styles.imageCardHistoryHome}
          resizeMode="cover"
          source={{ uri: item.Image }}
         />
      </View>     
    )

    render() {
        if(this.state.isLoading){
            return (
              <View style={styles.loadingContainer}>               
                <ActivityIndicator size='large' color='#6646ee' />
              </View>)
        }
        return (
          <ImageBackground source={require('../../Background/logo.jpg')} style={{width: '100%', height: '100%'}}>
            <SafeAreaView style={styles.container}>  
            <ScrollView>
            <View style={styles.headerContainer}>
              <User user={this.state.user} onPress={() => this.props.navigation.navigate('Update', {sender: 'Home'})}/>             
              
            </View>  
            <Headline>{this.state.headline}</Headline>                       
              <Divider />
              <View>
              
                <View style={styles.bodyContainer}>                 
                <FlatList
                  data={this.state.oldSearceData}
                  renderItem={this.renderItem}
                  keyExtractor={item => item.ID}
                />
                </View>               
              </View>
              
              <AwesomeAlert
                            show={this.state.showAlert}
                            showProgress={false}
                            title='Whattttt?! 😧'
                            message='Are you sure you want delete this search?'
                            closeOnTouchOutside={false}
                            closeOnHardwareBackPress={false}
                            showCancelButton={true}
                            showConfirmButton={true}
                            cancelText="No, Thanks"
                            confirmText="Yap."
                            confirmButtonColor={Colors.red100}
                            onCancelPressed={() => { this.onCancel()}}
                            onConfirmPressed={() => { this.onConfirm() }}
                        />
            </ScrollView>
                    <Overlay isVisible={this.state.isOverlaylVisible}>
                        <View style={styles.historyOverlayHome}>

                          <Headline style={styles.historyOverlayHeadHome} >{this.state.moreInfoName}</Headline>
                          <ScrollView>
                            <Text style={styles.historyOverBodyHome}>{this.state.moreInfoBiography}</Text >
                          </ScrollView>
                          <View >

                            <TouchableOpacity
                              style={styles.historyOverlyCloseBtnHome}
                              onPress={() => this.setState({ isOverlaylVisible: false })} >
                              <Text style={{fontSize: 17}}>close</Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </Overlay>
            </SafeAreaView>
          </ImageBackground>
          
        )
    }
  }
  

export default Home;
const styles = StyleSheet.create({
  headerContainer: {
    height: height/5,
    width: width,
    paddingVertical: 20,
    flexDirection: 'column',
  },
  bodyContainer: {
    height: height/1.7,
    width: width,
    paddingVertical: 20,
    flexDirection: 'row',
  },
  itemSearch: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 10,
    flexWrap: 'wrap',
    width: width/1.1,
    backgroundColor: Colors.grey50,
    height: height/5,
  },
  deleteBtn: {
    textAlign: 'center',
    margin: '10'
  },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
        flexDirection: 'column',
        flex: 1,

        paddingHorizontal: 10,
        flexWrap: 'wrap',
    },
    historyCardHome: {
      flexDirection: "row",
      justifyContent: 'space-between',
      paddingBottom: 10,
      paddingTop: 10,
    },
    NameAndDeleteViewHome: {
      width: '53%',
      alignItems: 'flex-end',
      right: 15
    },
    textNameHome: {
      fontSize: 10,
      fontWeight: "bold",
      color: '#2F3E46',
      fontFamily: 'serif'
    },
    imageCardHistoryHome: {
      width: 100,
      height: 120,
      borderRadius: 10,
      left: 5
    },
    DeletecssHome: {
      position: 'absolute',
      bottom: 20,
      width: '100%',
    },
    historyOverlayHome: {
      flexDirection: 'column',
      flex: 1,
      padding: 10,
      backgroundColor: '#1EA896',
    },
    historyOverlayHeadHome: {
      color: 'white',
      fontSize: 19,
      textAlign: 'center',
      fontWeight: 'bold',
    },
    historyOverBodyHome: {
      fontSize: 17,
      color: 'white'
    },
    historyOverlyCloseBtnHome: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F4F1BB',
      borderRadius: 5,
      marginTop: 7,
    },
    loadingContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
})
