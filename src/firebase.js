// Import the functions you need from the SDKs you need
//  import firebase from 'firebase/compat/app';
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
// import { initializeApp } from "firebase-admin/app";

// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAYB1LIpIjYOXxqu5JMq0PmGO4D4VvRWCw",
  authDomain: "clone-7943a.firebaseapp.com",
  projectId: "clone-7943a",
  storageBucket: "clone-7943a.appspot.com",
  messagingSenderId: "685799100227",
  appId: "1:685799100227:web:db91a9035add227b56e9f6",
  measurementId: "G-H8PEW6SNTB",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = firebase.auth();
const db = app.firestore();
export { auth, db };
// const analytics = getAnalytics(app);
