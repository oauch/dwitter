import firebase from "firebase/app";
import "firebase/auth";


const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_DATABASE_PROJECTID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKETD,
    messagingSenderId: process.env.REACT_APP_MESSAGE_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENTID
  };


  firebase.initializeApp(firebaseConfig);
  export const authService = firebase.auth();