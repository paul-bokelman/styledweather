import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
// import admin from "firebase-admin";
// const admin = require('firebase-admin');

const firebaseConfig = {
  apiKey: "AIzaSyA3doIgqzpGmyiqiMWJpRGJEHjakx4Vnzc",
  authDomain: "weatherproject-50de3.firebaseapp.com",
  projectId: "weatherproject-50de3",
  storageBucket: "weatherproject-50de3.appspot.com",
  messagingSenderId: "411403278842",
  appId: "1:411403278842:web:5530a14243bca8a9ed6c43",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase;
// firebase.analytics();
