import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { TextInput } from 'react-native-paper';

const { width, height } = Dimensions.get('screen');

export default function FormInput(props) {
  return (
    <TextInput
      label='Username'
      style={styles.input}
      numberOfLines={1}
      value={props.username}
      autoCapitalize='none'
      editable={true}
      onChangeText={props.onChangeText}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    marginTop: 10,
    marginBottom: 10,
    width: width / 1.5,
    height: height / 15,
    //padding: 10
  }
});