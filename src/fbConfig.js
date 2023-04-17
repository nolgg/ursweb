import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

// Replace this with your own config details
const firebaseConfig = {
  apiKey: "AIzaSyDVYSj0dCcDTw6-1D85_-Xd-_zzcAgnDVs",
  authDomain: "nsc22-c9f56.firebaseapp.com",
  databaseURL: "https://nsc22-c9f56-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "nsc22-c9f56",
  storageBucket: "nsc22-c9f56.appspot.com",
  messagingSenderId: "935490445508",
  appId: "1:935490445508:web:2cea5f25fe70faa13e6991",
  measurementId: "G-F8VVN1L7VD"
};

firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({ timestampsInSnapshots: true });
const firestore = firebase.firestore();

export default firebase;