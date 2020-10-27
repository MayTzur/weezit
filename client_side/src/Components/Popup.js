import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Modal, Text, Linking } from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import { Button } from 'react-native-paper';

export class ModalAlert extends React.Component {
  constructor(props){
    console.log('ModalAlert props=', props);
    super(props)
    //this.key = props.key;
    this.state = { isShow: props.isVisible, answer: '', key: props.data }
  }
  

  /*componentDidMount(){ 
    console.log('isVisible props=', this.props.isVisible);
    //this.state.isShow = this.props.isVisible 
    this.setState({ isShow: this.props.isVisible})
  }*/

  handleUrl = () => {
    const { key, answer } = this.state;
    console.log('CancelGame function');
    let redirectUrl = 'exp://192.168.8.84:19000/--/waitingRoom/key';//waitingRoom/'+key
    //Linking.makeUrl('exp://192.168.8.84:19000/--/game/waitingRoom', { key: this.state.key, ans: this.state.answer });
    console.log('redirectUrl=', redirectUrl);
    Linking.openURL(redirectUrl)
  }

  creatorAns = (ans) => {
    console.log('ans=', ans);
    this.setState({
      answer: ans,
      isShow: false
    },() => this.handleUrl())
  }

  render(){
    if(this.state.key !== null){
      return(
        <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.isShow}
            onRequestClose={() => {console.log('onRequestClose')}}
        >
            <View style={styles.modalView}>
                <View style={styles.modalMessageView}>
                    <Text style={styles.title}>You've got a message!{"\n"}</Text>
                    <Text style={styles.txt}>Your friend wants to play now,{"\n"}what do you want to do?</Text>
                </View>
                <View style={styles.modalButtonView}>
                    <Button theme={theme2} onPress={() => this.creatorAns('Cancel')}>Cancel game.</Button>
                    <Button theme={theme} onPress={() => this.creatorAns('GO')}>go game!</Button>     
                </View>  
            </View>
        </Modal>
    )
    }
    return null;
  }
}

export const ModalHelper = (props) => {
    console.log('ModalAlert props=', props);
    //const key = useRef(props.key);
    const isShow = useRef(props.isVisible);
    const [answer, setAnswer] = useState("");
    useEffect(() => {        
        if (isShow.current && answer !== '') {
            isShow.current = false;
            let redirectUrl = 'exp://192.168.8.84:19000/--/game/await/'+props.key+'/'+answer;
            console.log("redirectUrl", redirectUrl);
            Linking.openURL(redirectUrl)
                return;
        }

        console.log("answer", answer);
        console.log("isShow", isShow);
      }, [answer]);
   /* */
    return(
        <Modal
            animationType="slide"
            transparent={true}
            visible={isShow.current}
            onRequestClose={() => {console.log('onRequestClose')}}
        >
            <View style={styles.modalView}>
                <View style={styles.modalMessageView}>
                    <Text style={styles.title}>You've got a message!{"\n"}</Text>
                    <Text style={styles.txt}>Your friend wants to play now,{"\n"}what do you want to do?</Text>
                </View>
                <View style={styles.modalButtonView}>
                    <Button theme={theme2} onPress={() => setAnswer('Cancel')}>Cancel game.</Button>
                    <Button theme={theme} onPress={() => setAnswer('GO')}>go game!</Button>     
                </View>  
            </View>
        </Modal>
    )
}

export const AlertGame = (props) => {
    console.log('AlertGame props=', props);
    const [showAlert, setShowAlert] = useState(props.visible);
    const [answer, setAnswer] = useState("");

    useEffect(() => {
        console.log('AlertGame answer=', answer);
        if(answer == 'PLAY'){           
            //linking to board game + close
            setShowAlert(false);
        } else if (answer == 'CANCEL'){
            //remove game + tell the joiner that game was removed + close
            setShowAlert(false);
        }
    })

    return(
        <AwesomeAlert
              show={showAlert}
              showProgress={false}
              title="AwesomeAlert"
              message="I have a message for you!"
              closeOnTouchOutside={true}
              closeOnHardwareBackPress={false}
              showCancelButton={true}
              showConfirmButton={true}
              cancelText="No, cancel"
              confirmText="Yes, delete it"
              confirmButtonColor="#DD6B55"
              onCancelPressed={() => {
                setAnswer('CANCEL');
              }}
              onConfirmPressed={() => {
                setAnswer('PLAY');
              }}
            />
    )
    
}

export class AlertHelper {
    static dropDown;
    static onClose;
  
    static setDropDown(dropDown) {
      this.dropDown = dropDown;
    }
  
    static show(type, title, message) {
        //console.log('this.dropDown=', this.dropDown);
      if (this.dropDown) {
        this.dropDown.alertWithType(type, title, message);
      }
    }
  
    static setOnClose(onClose) {
      this.onClose = onClose;
    }
  
    static invokeOnClose() {
      if (typeof this.onClose === 'function') {
        this.onClose();
      }
    }
}

const theme = {
    colors: {
      primary: '#2751F9'
    }
}
const theme2 = {
    colors: {
      primary: '#F92727'
    }
}

const styles = StyleSheet.create({
    modalButtonView: {
       flexDirection: 'row',
       padding: 10,
    },
    modalView: {
      position: 'absolute',
      bottom: 2,
      width: '100%',
      backgroundColor: '#F9C927',
      margin: 5
    },
    modalMessageView: {
      padding: 10,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold'
    },
    txt: {
      fontSize: 18
    }
})