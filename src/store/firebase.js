// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
// import "firebase/auth";
import "firebase/firestore";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBoeG0zEVOggmaMwHHCQBxmeKz06SVJJPE",
  authDomain: "tiffanyblog-cd8a9.firebaseapp.com",
  databaseURL: "https://tiffanyblog-cd8a9.firebaseio.com",
  projectId: "tiffanyblog-cd8a9",
  storageBucket: "tiffanyblog-cd8a9.appspot.com",
  messagingSenderId: "820940203353",
  appId: "1:820940203353:web:b8ba381838dda47e2a1848"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore;
export { db }