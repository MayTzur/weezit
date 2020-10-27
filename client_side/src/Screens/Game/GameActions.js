import {firebase, db} from './Firebase';

const difficulty = { easy: 'easy', medium: 'medium', hard: 'hard'};
const category = {Celebrities: 26, Television: 14, Film: 11, Music: 12};
const STATE = {AWAIT: 1, READY: 2, GAME_OVER: 3, SWITCH: 4, ANSWERED: 5};
const ref = db.ref('/games');

const searchWaitingGame = async() => {   
    const games = await ref.orderByChild('state').equalTo(STATE.AWAIT).once('value', (snapshot) => {
      return snapshot.val();
    });
      return games;
  }

  const transAction = async (key, uid, username) => {

      const transResult = await firebase.database().ref(`/games/${key}/`).transaction(
        (game) => {
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
        return transResult;
  }
  const writeGameData = (gameInfo) => {   
    const newGameRef= ref.push();
    newGameRef.set({ 
      creator: gameInfo.creator,
      state: gameInfo.state, 
      questionsList: gameInfo.questionsList
     })
    .catch((error) => { console.log('error ', error) })
    return newGameRef.key;
  }

  const shuffleOptionArray = (array) => { 
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

  const newFormat = (questionsRes) => { 
    const newFormat = questionsRes.map((questionObj) => {
        const arr = questionObj.incorrect_answers;
        arr.push(questionObj.correct_answer);
        let options = shuffleOptionArray(arr);

        return { question: questionObj.question, options: options, correct: questionObj.correct_answer }
    })
    return newFormat;
}

  const fetchQuestion = async() => { 
    const questionAPI = `https://opentdb.com/api.php?amount=10&category=${category.Celebrities}&difficulty=${difficulty.easy}&type=multiple`;

    try {
        const response = await fetch(questionAPI, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8'
            })
        });
          
        const res = await response.json();
        const questions = res.results
        
        return await newFormat(questions);
    }
    catch (err) {
        console.log('error: ' + err);
        return err;
    }
  }

export { searchWaitingGame, transAction, writeGameData, fetchQuestion, STATE };
