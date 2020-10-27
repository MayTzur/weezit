import React from 'react';
import {firebase, db} from './Firebase';
//const ref = db.ref('/games');
//import {listenGame} from './ListenGame';
//db = firebase.database();

/*    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
    clearInterval(this.timerID); */
const difficulty = { easy: 'easy', medium: 'medium', hard: 'hard'};
const category = {Celebrities: 26, Television: 14, Film: 11, Music: 12};
const STATE = {AWAIT: 1, READY: 2, GAME_OVER: 3, SWITCH: 4, ANSWERED: 5};
const ref = db.ref('/games');
//search game in firebase functions:
const searchWaitingGame = async() => { //check!
    console.log('searchWaitingGame function:');
    // const games = await ref.orderByChild('state').limitToFirst(1).equalTo(STATE.AWAIT).once('value', (snapshot) => {
  
    const games = await ref.orderByChild('state').equalTo(STATE.AWAIT).once('value', (snapshot) => {
      console.log('snapshot.val()');
      console.log(snapshot.toJSON());
      return snapshot.val();
    });
  
    console.log(' return games');
    return games;
  }

  const transAction = async (key, uid, username) => { //check!
    console.log('transAction function:')
    
    console.log('key=', key);
    console.log('uid=', uid);
    console.log('username=', username);

      const transResult = await firebase.database().ref(`/games/${key}/`).transaction(
        (game) => {
          console.log('game', game)
          if(game.joiner){
            return;
          } else {
            game.state = STATE.READY,
            game.joiner = {
              uid: uid,
              username: username,
              correctAns: 0
            }
            return game;
          }       
        }).catch((error) => { console.log('error ', error)})
        console.log('transResult=', transResult);
        return transResult;
  }
//insert game data to firebase:
  const writeGameData = (gameInfo) => { //check!
    console.log('writeGameData function: ');
  
    const newGameRef= ref.push();
    newGameRef.set({ 
      creator: gameInfo.creator,
      state: gameInfo.state, 
      questionsList: gameInfo.questionsList
     })
    .catch((error) => { console.log('error ', error) })
  
    console.log('newKey: ');
    console.log(newGameRef.key);
    return newGameRef.key;
  }
// questions method:
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

  const newFormat = (questionsRes) => { //check!
    console.log('newFormat function:');
    const newFormat = questionsRes.map((questionObj) => {
        const arr = questionObj.incorrect_answers;
        arr.push(questionObj.correct_answer);
        let options = shuffleOptionArray(arr);

        return { question: questionObj.question, options: options, correct: questionObj.correct_answer }
    })
    console.log('newFormat');
    console.log(newFormat);
    return newFormat;
}

  const fetchQuestion = async() => { //check!
    console.log('fetchQuestion function:');

    const questionAPI = `https://opentdb.com/api.php?amount=10&category=${category.Celebrities}&difficulty=${difficulty.easy}&type=multiple`;
    console.log('questionAPI :'+questionAPI);

    try {
        const response = await fetch(questionAPI, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8'
            })
        });
        console.log('response= ', response);
        console.log('response.status= ' + response.status);
        const res = await response.json();
        console.log('res= ', res.results);
        const questions = res.results
        console.log(questions);
        
        return await newFormat(questions);
    }
    catch (err) {
        console.log('error: ' + err);
        return err;
    }
  }

export { searchWaitingGame, transAction, writeGameData, fetchQuestion, STATE };