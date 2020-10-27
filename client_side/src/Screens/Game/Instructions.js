import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import Dialog from 'react-native-dialog';

export const Instructions = (props) => {
    return (
        <Dialog.Container visible={props.visible}>
            <View style={styles.titleContainer}>
                <Dialog.Title style={styles.title}>So it goes like this:</Dialog.Title>
            </View>
            
            <ScrollView>
                <Dialog.Description>
                    We need to put the game instructions in here...........
                </Dialog.Description>
            </ScrollView>
            <View>
                <Dialog.Button label="GOT IT!" onPress={ props.onPress}/>
            </View>
            
        </Dialog.Container>
      )
}
const styles = StyleSheet.create({
    title: {
        fontWeight: 'bold',
        fontSize: 20, 
    },
    titleContainer: {
      alignItems: 'center',
    }
  });