import React from 'react';
import { StyleSheet, Dimensions, Text } from 'react-native';
import Dialog from 'react-native-dialog';
//import ConfirmDialog  from 'react-native-simple-dialogs';

export const GetDialog = (props) => {
    return(     
        <Dialog.Container visible={props.visible}>
            <Dialog.Title>{props.title}</Dialog.Title>
            <Dialog.Description>{props.description}</Dialog.Description>
            <Dialog.Button label="NO" onPress={() => props.onPress('NO')}/>
            <Dialog.Button label="YES" onPress={() => props.onPress('YES')}/>
        </Dialog.Container>   
        )
}