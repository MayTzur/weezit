import React from 'react';
import {firebase, db} from './Firebase';
import { storageKeys, save, read, deleteAll, deleteItem } from '../../Storage';
import { STATE } from './GameActions';

const ref = db.ref('/games');

const newFormat = (questionsRes) => { //check!
  console.log('newFormat function:');
  const newFormat = questionsRes.map((questionObj) => {
      const arr = questionObj.incorrect_answers;
      arr.push(questionObj.correct_answer);
      let options = shuffleOptionArray(arr);

      return { question: questionObj.question, options: options, correct: questionObj.correct_answer }
  })
  return newFormat;
}

const shuffleOptionArray = (array) => { //check!
  console.log('shuffleOptionArray function:');
  let max = array.length;
  let temp;
  let index;

  // While there are elements in the array
  while (max > 0) {
      index = Math.floor(Math.random() * max);
      max--;
      temp = array[max];
      array[max] = array[index];
      array[index] = temp;
  }
  return array;
}


const FetchQuestion = async() => { //check!
  console.log('FetchQuestion function:');
  try{
      const request = {
          method: 'GET',
          headers: new Headers({
              'Content-Type': 'application/json; charset=UTF-8'
          })
      }
      const url = 'https://opentdb.com/api.php?amount=10&category=26';
      let response = await fetch(url, request);
      //console.log('response= ', response.json());
      const res = await response.json();
      //console.log('res= ', res.results);
      const questions = await res.results
      //console.log('questions=',questions);
      return await newFormat(questions);
  }
  catch(error){
      console.log('error=', error);
  }
}

const takeQuestion = async(pointer, gameKey) => {
  console.log('takeQuestion function:');
  //temp gameKey --- only to check this function!

  const questionRef = await db.ref(`/games/${gameKey}/questionsList/${pointer}/`)
  .once("value", (snapshot) => {
    console.log(snapshot.val());
    return snapshot.val();
  })
  console.log('questionRef');
  console.log(questionRef.val());
  return questionRef.val();
}

export { takeQuestion, FetchQuestion };