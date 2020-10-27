import React from 'react';
import { Alert, View, Button, Image, KeyboardAvoidingView } from 'react-native';
import { wikiData } from '../Functions/WikiData';
import { titleConverter } from '../Functions/TitleConverter';
import { goClarifai } from '../Functions/GoClarifai';
import * as ImagePicker from 'expo-image-picker';

const url = 'http://en.wikipedia.org/w/api.php?action=query&prop=pageimages|description&format=json&pithumbsize=100&formatversion=2&titles=';

export default class ImageGallery extends React.Component {
    static navigationOptions = {
        title: 'GALLERY',
    };

    constructor(props) {
        super(props);
        this.state = {
            image: null,
            base64: '',
            title: '',
            res_arr: [],
            photoUri: '',
            uplodedPicUri: { uri: '' },
            picUri: ''
        }
    }

    buildAPI(names) {
        const api = url + names[0] + '|' + names[1] + '|' + names[2];
        console.log('api: ' + api);
        fetch(api, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8'
            })
        })
            .then(response => response.json())
            .then(async (data) => {
                const objs = wikiData(data.query.pages);
                this.setState({ res_arr: objs, isModalVisible: !this.state.isModalVisible }, console.log(this.state.res_arr));

                  Alert.alert(
                            'Would you like to save the picture?',
                            '',
                            [
                                { text: 'yes', onPress: () => this.props.navigation.navigate('ImageMach', { info:this.state.res_arr}) },
                                {
                                    text: 'No',
                                    style: 'cancel',
                                }],
                        );
            },
                (err) => {
                    console.log('err: ' + err);
                })
    }

    getClarifai = async () => {
        console.log('enter to "goClarifai" func');
        const results = await goClarifai(this.state.base64);
        const names = titleConverter(results);
        await Promise.all([...names]);
        this.buildAPI(names);
    }

    btnOpenGalery = async () => {
        const options = { base64: true };
        let result = await ImagePicker.launchImageLibraryAsync(options);
        this.setState({ picUri: result.uri });
        this.setState({ base64: result.base64 });
        console.log('go to clarifai:');
        this.getClarifai();
    };

    SendMedia = async () => {}

    render() {
        let { image } = this.state;

        return (
            <KeyboardAvoidingView behavior="padding"
                style={styles.container}>

                <View style={styles.Content}>
                    <View style={{ margin: 20 }}>
                        <Button
                            title="Choose From Galery"
                            onPress={this.btnOpenGalery}
                        />
                    </View>
                    {image &&
                        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
                </View>

                <Button
                    onPress={this.SendMedia}
                    title='send media'
                />

               
            </KeyboardAvoidingView >
        );
    }
}
