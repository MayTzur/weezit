import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, AsyncStorage } from 'react-native';
import { Linking } from 'expo';
import SnackBar from 'react-native-snackbar-dialog-options';
import {firebase, db} from '../Screens/Game/Firebase';
import { userState } from '../functions/player';
let ref = db.ref('/games');

export const AndroidPopup = (navigation) => {
    const params = navigation.state.params;
    //console.log('AndroidPopup params navigation=', data);
    console.log('AndroidPopup params navigation=', params);
    SnackBar.add("It's game alert!\nClick on what you wanna do: ", {
        confirmText: "Let's play 😀",
        id: params.key, 
        //isStatic: true,
        backgroundColor: '#00838f',
        buttonColor: '#e1f5fe',
        textColor: '#f1f8e9',
        onConfirm: () => {
          console.log('Thank you')
          ref.child(params.key + '/creator').update({ userState: userState.confirmed })
          SnackBar.dismiss();//Linking.openURL('exp://192.168.8.84:19000/--/game/data.userId/data.key');
          navigation.navigate('Board', { id: params.user.ID, key: params.key })         
        },
        cancelText: 'Skip',
        onCancel: () => {      
          SnackBar.dismiss(() => SnackBar.show('Would you like to continue receiving game alerts? 🧐',{
            confirmText: 'Yep!',
            id: params.key, 
            //isStatic: false,
            backgroundColor: '#26c6da',
            buttonColor: '#e1f5fe',
            textColor: '#000000',
            onConfirm: () => {//just reject this game               
                ref.child(params.key + '/creator').update({ userState: userState.rejected })
                SnackBar.dismiss()
            },
            cancelText: 'Nop..',
            onCancel: () => {//remove this game               
                ref.child(params.key + '/creator').update({ userState: userState.remove })
                SnackBar.dismiss()
            }
          }))
        }
    })
}

const newFormat = (questionsRes) => { // ---
  console.log('*** newFormat function ***');
  const newFormat = questionsRes.map((questionObj) => {
      const arr = questionObj.incorrect_answers;
      arr.push(questionObj.correct_answer);
      let options = shuffleOptionArray(arr);

      return { question: questionObj.question, options: options, correct: questionObj.correct_answer }
  })
  return newFormat;
}

const shuffleOptionArray = (array) => { // ---
  console.log('*** shuffleOptionArray function ***');
  let max = array.length;
  let temp;
  let index;

  while (max > 0) {
      index = Math.floor(Math.random() * max);
      max--;
      temp = array[max];
      array[max] = array[index];
      array[index] = temp;
  }
  return array;
}

export const FetchQuestion = async() => { 
  console.log('*** FetchQuestion function ***');
  try{
      const request = {
          method: 'GET',
          headers: new Headers({
              'Content-Type': 'application/json; charset=UTF-8'
          })
      }
      const url = 'https://opentdb.com/api.php?amount=10&category=26';
      let response = await fetch(url, request);
      const res = await response.json();
      const questions = await res.results
      return await newFormat(questions);
  }
  catch(error){
      console.log('error=', error);
  }
}