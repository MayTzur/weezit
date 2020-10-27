import { db } from './Firebase';

const newFormat = (questionsRes) => { 
  const newFormat = questionsRes.map((questionObj) => {
      const arr = questionObj.incorrect_answers;
      arr.push(questionObj.correct_answer);
      let options = shuffleOptionArray(arr);

      return { question: questionObj.question, options: options, correct: questionObj.correct_answer }
  })
  return newFormat;
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


const FetchQuestion = async() => { 
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

const takeQuestion = async(pointer, gameKey) => {
  const questionRef = await db.ref(`/games/${gameKey}/questionsList/${pointer}/`)
  .once("value", (snapshot) => {
    return snapshot.val();
  })
  return questionRef.val();
}

export { takeQuestion, FetchQuestion };
