import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Replace this with your own config details
const config = {
  apiKey: "AIzaSyDo2HauU6PtL3PY6KthXdpIUzbDV908avo",
  apiKey: "AIzaSyDVYSj0dCcDTw6-1D85_-Xd-_zzcAgnDVs",
  authDomain: "nsc22-c9f56.firebaseapp.com",
  projectId: "nsc22-c9f56",
  storageBucket: "nsc22-c9f56.appspot.com",
  messagingSenderId: "935490445508",
  appId: "1:935490445508:web:2cea5f25fe70faa13e6991",
  measurementId: "G-F8VVN1L7VD"
};
firebase.initializeApp(firebaseconfig);
firebase.firestore().settings({ timestampsInSnapshots: true });

export const db = getFirestore(app);