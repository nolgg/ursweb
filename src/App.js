import Header from "./component/Header";
import Home from "./component/Home";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./component/auth/Login.js";
import SignUp from "./component/auth/Signup.js";
import Addp from "./component/doc/Addp.js";
import Homedoc from "./component/doc/homedoc.js";
import resultdoc from "./component/doc/resultdoc.js";
import Homept from "./component/PATIENT/homept";
import Headerpt from "./component/PATIENT/Headerpt.js";


import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import HeaderDoc from "./component/doc/HeaderDoc.js";


// import SignIn from './component/auth/Ssystem.js';
//import SignUp from './component/auth/Ssystem.js';

// import Banner from './components/Banner'
// import Content from './components/Content'
// import CTA from './components/CallToAction'
// import Footer from './components/Footer'


const firebaseconfig = {
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




function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<><Header /><Home /></>} />
        <Route path="/create" element={<><HeaderDoc/><Addp /></>} />
        <Route path="/Docter" element={<> <HeaderDoc/><Homedoc/></>} />
        <Route path="/PATIENT" element={<> <Headerpt/><Homept/></>} />
        {/* <Route path="/Result" element={<><HeaderDoc/><Resultdoc/></>} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
