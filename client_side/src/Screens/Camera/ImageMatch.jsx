import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, ScrollView } from 'react-native';
import { Headline, Subheading } from 'react-native-paper'; //
import { MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import { Container } from 'native-base';
import ReviewCard from './ReviewCard';
import { Button, Overlay } from 'react-native-elements';

const wikipediaUrl = 'https://wikipedia.org/wiki/'
const server = "http://proj.ruppin.ac.il/bgroup8/prod/serverSide/api";

class ImageMatch extends React.Component {
    static navigationOptions = {
        title: 'Matches',
    };
    constructor(props) {
        super(props);
        this.state = {
            information: this.props.navigation.getParam('info', 'info not pass'),
            celbrityPic: '',
            counter: 0,
            moreInfo: this.props.navigation.getParam('moreInfo', 'info not pass'),
            isModalVisible: false,
            visibleSuccess: false,
            visibleError: false,
            userId: this.props.navigation.getParam('userId', 0),
        }
    }

    postInfo = async () => {
        const { information } = this.state;
        console.log('postInfo function:');
        const url = server + `/User/InsertUserSearch/`+ this.state.userId;
        let data = {
            Name: information[this.state.counter].name,
            ID: information[this.state.counter].id, 
            Image: information[this.state.counter].image,
            Biography: information[this.state.counter].biography
        }
        let postRequest = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8'
            })
        }

        try {
            let response = await fetch(url, postRequest);
            if (response.status == 200) { //successfully
                this.setState({ visibleSuccess: true })
            } else {
                this.setState({ visibleError: true })
            }
        }
        catch (error) {
            console.log('error=', error);
        }
    }

    PlusCounter = () => {
        {
            this.state.counter >= this.state.information.length - 1
                ? this.setState({ counter: 0 })
                :
                this.setState({ counter: this.state.counter + 1 })
        }
    }

    MinusCounter = () => {
        {
            this.state.counter == 0
                ? this.setState({ counter: this.state.information.length - 1 })
                : this.setState({ counter: this.state.counter - 1 });
        }
    }

    WikiLink = () => {
        console.log('WikiLink function:');
        const CelebritiTittle = this.state.information[this.state.counter].name;
        const WikiName_Format = CelebritiTittle.replace(" ", '_')
        Linking.openURL(wikipediaUrl + WikiName_Format)
    }

    render() {
        return (
            <Container style={{ flex: 1 }}>
                <ScrollView>
                    <ReviewCard info={this.state.information[this.state.counter]} />

                    <View style={styles.match_btn}>
                        <TouchableOpacity onPress={this.postInfo} style={styles.match_btn}>
                            <Entypo name="emoji-happy" size={24} color="#4A90E2" />
                            <Text style={styles.tlt}>That's my match</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={[styles.fixToText, { alignItems: 'flex-end' }]}>
                        <TouchableOpacity style={styles.mach_btnArrow} onPress={this.PlusCounter}>
                            <MaterialCommunityIcons name='arrow-right' size={20} />
                            <Text style={styles.Mach_txt}>NEXT</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.mach_btnArrow} onPress={this.MinusCounter}>
                            <Text style={styles.Mach_txt}>PREVIOUS</Text>
                            <MaterialCommunityIcons name='arrow-left' size={20} />
                        </TouchableOpacity>
                    </View>
                    {/* עד פה הכנסתי SCROLLVIEW */}
                </ScrollView>
                <Overlay isVisible={this.state.visibleSuccess}>
                    <View style={styles.mach_modal}>
                        <Headline style={[styles.message, styles.mess1]}>Match saved successfully!</Headline>
                        <Subheading style={[styles.message, styles.mess2]}>Go for your history?</Subheading>
                        <View style={styles.fixTo}>
                            <Button title="Yap!" type="clear" onPress={() => this.setState({ visibleSuccess: false }, () => this.props.navigation.navigate('Home'))} />
                            <Button title="nope!" type="clear" onPress={() => this.setState({ visibleSuccess: false })} />
                        </View>
                    </View>
                </Overlay>

                <Overlay isVisible={this.state.visibleError}>
                    <View style={styles.modal}>
                        <Headline style={[styles.message, styles.mess3]}>Error...</Headline>
                        <Subheading style={[styles.message, styles.mess2]}>The match wasn't saved, do you want try again??</Subheading>
                        <View style={styles.fixTo}>
                            <Button title="Yas!" type="clear" onPress={() => this.setState({ visibleError: false }, () => this.postInfo())} />
                            <Button title="No, Thanks" onPress={() => this.setState({ visibleError: false })} />
                        </View>
                    </View>
                </Overlay>

            </Container>
        );
    }
}
export default ImageMatch;

styles = StyleSheet.create({
    container: {
        flex: 0.8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'whitesmoke',
        flexDirection: 'column',
    },
})