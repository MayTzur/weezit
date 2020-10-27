import * as firebase from 'firebase';
import 'firebase/database';
import 'firebase/app';

const firebaseConfig = {
    apiKey: " ******** ",
    authDomain: "whoisit-*****.firebaseapp.com",
    databaseURL: "https://whoisit-*****.firebaseio.com",
    projectId: "whoisit-*****",
    storageBucket: "whoisit-*****.appspot.com",
    messagingSenderId: " ************ ",
    appId: "*:*********:web:**********",
    measurementId: "*-*********"
  };
  if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
  }

const db = firebase.database();

export { firebase, db };
