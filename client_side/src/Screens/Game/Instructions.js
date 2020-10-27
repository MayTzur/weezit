import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import Dialog from 'react-native-dialog';

export const Instructions = (props) => {
    return (
        <Dialog.Container visible={props.visible}>
            <View style={styles.titleContainer}>
                <Dialog.Title style={styles.title}>So it goes like this:</Dialog.Title>
            </View>
            
            <ScrollView>
                <Dialog.Description>
                    The game has 2 players, 10 questions, 4 possible answers and 15 seconds to answer the question.
                    When the other player answers, you can see if he was right or wrong but you will not see what answer he chose. That means he sees you too.
                    If you both answered the question before the end of the time - the question will change.
                    If a player does not answer the question - it will be considered as an incorrect answer.
                    If a player leaves the game before it ends - the game will end, he will automatically lose and the other player will win.
                    The entry fee for the game is 100 coins and the winner wins 250 coins.
                    Good luck!!!
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
