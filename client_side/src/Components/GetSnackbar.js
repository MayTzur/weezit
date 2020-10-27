import React from 'react';
import { StyleSheet, Dimensions, Text } from 'react-native';
import { Snackbar } from 'react-native-paper';

const { width, height } = Dimensions.get('screen');

export const GetSnackbar = (props) => {
    return (
        <Snackbar
            visible={props.visible}
            onDismiss={props.onDismiss}
            duration={1500}
        ><Text style={styles.txt}>{props.text}</Text></Snackbar>
    );
  }

const styles = StyleSheet.create({
  input: {
    marginTop: 10,
    marginBottom: 10,
    width: width / 1.5,
    height: height / 15,
    //padding: 10
  },
  txt: {
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 20, 
    flex: 1
  }
});