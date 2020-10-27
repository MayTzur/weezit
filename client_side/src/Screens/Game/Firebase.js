/*import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/functions';
import 'firebase/auth';*/
import * as firebase from 'firebase';
import 'firebase/database';
import 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyAGzM8aYJdKVaXjipgJPkSgxqcnIC-T_mo",
    authDomain: "whoisit-17b4e.firebaseapp.com",
    databaseURL: "https://whoisit-17b4e.firebaseio.com",
    projectId: "whoisit-17b4e",
    storageBucket: "whoisit-17b4e.appspot.com",
    messagingSenderId: "790235363589",
    appId: "1:790235363589:web:689cc70b1d3f7bba7b1f6c",
    measurementId: "G-W9R7M9J3KJ"
  };
  if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
  }

const db = firebase.database();

export { firebase, db };