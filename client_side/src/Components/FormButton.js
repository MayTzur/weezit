import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Button } from 'react-native-paper';

const { width, height } = Dimensions.get('screen');

export default function FormButton({ ...rest }) {
  return (
    <Button
      mode='contained'
      {...rest}
      style={styles.button}
      contentStyle={styles.buttonContainer}
    >
      Save Changes
    </Button>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 10
  },
  buttonContainer: {
    width: width / 2,
    height: height / 15
  }
});