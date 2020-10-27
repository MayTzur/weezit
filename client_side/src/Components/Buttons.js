import React from 'react';
import { StyleSheet, Dimensions, TouchableOpacity, View, Text } from 'react-native';
import { IconButton, Button } from 'react-native-paper';

const { width, height } = Dimensions.get('screen');

export const CustomButton = props => {
    return(
        <TouchableOpacity onPress={props.onPress}>
            <View style={{...styles.button, ...props.style}}>
                <Text style={{...styles.buttonText, ...props.textStyling }}>
                    {props.children}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

export const SaveBtn = (props) => {
  return (
    <Button
        mode='contained'
        title='Save Changes'
        labelStyle={{ fontSize: 22 }}
        style={styles.button}
        contentStyle={[styles.buttonContaine, {backgroundColor: props.color}]}
        onPress={props.onPress}
    >Save Changes</Button>
  );
}

export const EditBtn = (props) => {
    return(
        <IconButton
            icon='account-edit'
            color='#304FFE'
            size={25}
            onPress={props.onPress}
            style={styles.edit1}
        />
    )
}

export const GoGalleryBtn = (props) => {
    return(
        <IconButton
            icon='folder-multiple-image'
            //color={props.color}
            size={25}
            onPress={props.onPress}
            style={styles.edit}
        />
    )
}

export const DeleteImageBtn = (props) => {
    return(
        <IconButton
            icon='image-off'
            //color={props.color}
            size={25}
            onPress={props.onPress}
            style={styles.edit}
        />
    )
}

export const GoBackBtn = (props) => {
    return(
        <IconButton
            icon='keyboard-backspace'
            size={30}
            style={styles.button}
            color={props.color}
            onPress={props.onPress}
      />
    )
}

const styles = StyleSheet.create({
    button: {
      marginTop: 10
    },
    buttonContainer: {
      width: width / 1.5,
      height: height / 15,
    },
    edit: {
        top: -25, 
        //right: -35
    }
    ,
    edit1: {
        top: -115, 
    },
  });