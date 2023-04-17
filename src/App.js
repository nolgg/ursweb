import firebase from './fbConfig.js'
import Header from "./component/Header";
import Home from "./component/Home";
import React, { useContext } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./component/auth/Login.js";
import SignUp from "./component/auth/Signup.js";
import Addp from "./component/doc/Addp.js";
import Homedoc from "./component/doc/homedoc.js";
// import Result from "./component/doc/resultdoc.js";
import Homept from "./component/PATIENT/homept";
import Headerpt from "./component/PATIENT/Headerpt.js";
import ManageUserStatus from './component/auth/managestatus.js'
import { AuthContext, AuthProvider } from "./component/Atuh";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import HeaderDoc from "./component/doc/HeaderDoc.js";
import Result2 from './component/doc/resultdoctor2.js';


function App() {

  const authContext = useContext(AuthContext);
  const currentUser = authContext?.currentUser;

  

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<><Header /><Home /></>} />
          <Route path="/create" element={<><HeaderDoc/><Addp /></>} />
          <Route path="/Doctor" element={<> <HeaderDoc/><Homedoc/></>} />
          <Route path="/PATIENT" element={<> <Headerpt/><Homept/></>} />
          <Route path="/Result" element={<><HeaderDoc /><Result2 /></>} />
          <Route path="/manage" element={<><Header /><ManageUserStatus /></>} />
          
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
