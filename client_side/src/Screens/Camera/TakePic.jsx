
import React from 'react';
import { Text, View, StyleSheet, YellowBox, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native';
import { Camera } from 'expo-camera';
import { titleConverter } from '../Functions/TitleConverter';
import { goClarifai } from '../Functions/GoClarifai';
import Modal from 'react-native-modal';
import { ReadUserData } from '../../Componoents/UserProfile';
import { Container } from 'native-base';
import { IconButton, Colors } from 'react-native-paper';
import { CameraTitle } from '../../Componoents/Sentences';
import * as ImagePicker from 'expo-image-picker';
import { getBiography } from './GetInformation';
const { width, height } = Dimensions.get('screen');
YellowBox.ignoreWarnings(['Setting a timer']);

const options = { base64: true, quality: 1 };

export default class Home extends React.Component {
    static navigationOptions = {
        title: 'CAMERA',
    };
    constructor(props) {

        super(props);
        this.state = {
            hasCameraPermission: null,
            type: Camera.Constants.Type.back,
            photoUri: '',
            uplodedPicUri: { uri: '' },
            base64: '',
            title: '',
            moreInfo: [],
            username: '',
            picUri: '',
            expamleArr: [],
            onetxtdidyouknow: '',
            focusedScreen: true,
            user: null,
            //isModalVisible: true
        }
        this.DidyouknowApi = 'http://proj.ruppin.ac.il/bgroup8/prod/serverSide/api/Search/Facts'
    }

    setProfile = async() => {
        console.log('read user from db:')
        const user = await ReadUserData('Profile/');
        this.setState({ 
            user: user, 
        });  
    }

    async componentDidMount() { //check!
        console.log('componentDidMount function:');
        const { status } = await Camera.requestPermissionsAsync();
        this.setState({ hasCameraPermission: status === 'granted' });

        const { navigation } = this.props;
        navigation.addListener('willFocus', () =>
            this.setState({ focusedScreen: true })
        );
        navigation.addListener('willBlur', () =>
            this.setState({ focusedScreen: false })
        );

        this.setProfile();
        this.AddDidYouKnow();
    }

    btnOpenGalery = async () => { //check!
        console.log('btnOpenGalery function: ');
        try {
            let result = await ImagePicker.launchImageLibraryAsync(options);
            console.log('result: ', result);
            console.log('result.cancelled:', result.cancelled);
            if (!result.cancelled) {
                this.setState({
                    picUri: result.uri,
                    base64: result.base64
                }, () => this.getClarifai());
            }
        } catch (E) {
            console.log(E);
        }
    };

    tmdbData = async (names) => { //check!
        console.log('tmdbData function:');
        const url = `https://api.themoviedb.org/3/search/person?api_key=b306387c577add422568c903b1cbb052&language=en-US&query=`;
        let info = await Promise.all(
            names.map(async name => {
                let response = await fetch(url + name, {
                    method: 'GET',
                    headers: new Headers({
                        'Content-Type': 'application/json; charset=UTF-8'
                    })
                });
                return response.json();
            })
        )

        let objects = await Promise.all(
            info.map(async obj => {
                const biography = await getBiography(obj.results[0].id);
                console.log('biography=', biography);
                return {
                    name: obj.results[0].name,
                    id: obj.results[0].id,
                    image: 'https://image.tmdb.org/t/p/w500' + obj.results[0].profile_path,
                    popularity: obj.results[0].popularity,
                    biography: biography
                }
            })
        )
    
        this.toggleModal()
        this.props.navigation.navigate('Matches', { info: objects, userId: this.state.user.ID, moreInfo: this.state.moreInfo })
    }

    getClarifai = async () => { //check!
        console.log('enter to "goClarifai" func');
        const results = await goClarifai(this.state.base64);
        const names = titleConverter(results);
        await Promise.all([...names]);
        this.tmdbData(names);
    }

    btnSnap = async () => { //check!
        console.log('btnSnap function: ');
        try {
            if (this.camera) {
                let result = await this.camera.takePictureAsync(options);
                console.log('result: ', result);
                console.log('result.cancelled:', result.cancelled);
                this.toggleModal()
                this.setState({
                    picUri: result.uri,
                    base64: result.base64
                }, () => this.getClarifai());
            }
        } catch (E) {
            console.log(E);
        }
    };

    DidYouKnowModal = () => {
        return (
            <>
                <Modal isVisible={this.state.isModalVisible} >
                        <SafeAreaView style={styles.didYoyKnowModal}>
                            <Text style={styles.didYoyKnowModalheadTxt}>Did you Know? </Text>
                            <Text style={styles.didYoyKnowModaBodyText}>{this.state.onetxtdidyouknow}</Text>
                            <View style={styles.didYoyKnowModaBts}>
                            <TouchableOpacity onPress={this.AddDidYouKnow} style={styles.downbtnModal}><Text>Next Fact</Text></TouchableOpacity>
                        </View>
                        </SafeAreaView>
                </Modal>
            </>
        )
    }

    toggleModal = () => this.setState({ isModalVisible: !this.state.isModalVisible });


    AddDidYouKnow = () => {   
        fetch(this.DidyouknowApi, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8',
            })
        })
        .then(res => {
            return res.json()
        })
        .then(
            (result) => {
                this.setState({
                    didyouknowtext: result,
                    onetxtdidyouknow: result[Math.floor(Math.random() * 17) + 1].Did_You_know
                })
            },
            (error) => {
                console.log("err post=", error);
            });
    }

    render() {
        const { hasCameraPermission } = this.state;
        if (hasCameraPermission === null) {
            return <View />;
        } else if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        } else {
            return (
                <Container style={styles.container}>
                    {this.state.focusedScreen && <Camera
                        ref={ref => { this.camera = ref; }}
                        style={{ flex: 1, width: '100%' }}>
                        <CameraTitle />
                        <View
                            style={{
                                flex: 1,
                                backgroundColor: 'transparent',
                                flexDirection: 'row',
                            }}>
                        </View>
                        <this.DidYouKnowModal />
                        <View style={styles.btn_row}>
                            <IconButton
                                icon='camera'
                                color={Colors.white}
                                size={50}
                                onPress={() => { this.btnSnap() }}
                            />
                            <IconButton
                                icon='image-plus'
                                color={Colors.white}
                                size={50}
                                onPress={() => { this.btnOpenGalery() }} />
                        </View>
                    </Camera>}
                </Container>
            );
        }
    }
}
styles = StyleSheet.create({
//     didYoyKnowModal: {
//         backgroundColor: Colors.yellow600,
//         alignSelf: 'center',
//         width: width,
//         height: height/3.6,
//         justifyContent: 'center',
//         alignItems: 'center',
//         //paddingHorizontal: 20,
//         flexWrap: 'wrap',
//         borderRadius: 10,
        
//         //paddingHorizontal: 10,
//       },
//   downbtnModal: {
//     alignItems: 'flex-end',
//     marginTop: 20,
//   },
//       didYoyKnowModalheadTxt: {
//         color: Colors.cyan800,
//         fontSize: 20,
//         textAlign: 'center',
//         fontFamily: 'serif',
//       },
    
//       didYoyKnowModaBodyText: {
//         //marginTop: 20,
//         fontSize: 15,
//         color: Colors.cyan800,
//         fontFamily: 'Roboto',
//         textAlign:"center",
//       },
//       didYoyKnowModaBts: {       
//         flexDirection: "row",
//         justifyContent: 'space-around', 
//       },
//     appName: {
//         fontFamily: 'LondrinaSolid',
//         color: '#393f4d',
//         fontSize: 40,
//         top: 15,
//         margin: 25,
//         bottom: 30
//     },
//     container: {
//         flexWrap: 'wrap',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     heading: {
//         height: '8%',
//         padding: '20px'
//     },
//     title: {
//         color: '#393f4d',
//         fontSize: 40,
//         top: 15,
//         margin: 25,
//         bottom: 30
//     },
//     btn_row: {
//         flexDirection: 'column',
//         display: 'flex',
//         justifyContent: 'center',
//     },
})

