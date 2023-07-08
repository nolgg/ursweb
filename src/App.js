import firebase from "./fbConfig.js";
import Header from "./component/Header";
import Home from "./component/Home";
import React, { useContext } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./component/auth/Login.js";
import SignUp from "./component/auth/Signup.js";
import Addp from "./component/doc/Addp.js";

// import Result from "./component/doc/resultdoc.js";

import Headerpt from "./component/PATIENT/Headerpt.js";
import ManageUserStatus from "./component/auth/managestatus.js";
import { AuthContext, AuthProvider } from "./component/Atuh";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import HeaderDoc from "./component/doc/HeaderDoc.js";
import Result2 from "./component/doc/resultdoctor2.js";
import Resultpatient from "./component/PATIENT/Resultpatient.js";

function App() {
  const authContext = useContext(AuthContext);
  const currentUser = authContext?.currentUser;

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/"
            element={
              <>
                <Header />
                <Home />
              </>
            }
          />
          <Route
            path="/create"
            element={
              <>
                <Header />
                <Addp />
              </>
            }
          />
          <Route
            path="/Doctor"
            element={
              <>
                {" "}
                <Header />
                <Home />
              </>
            }
          />
          <Route
            path="/PATIENT"
            element={
              <>
                {" "}
                <Header />
                <Home />
              </>
            }
          />
          <Route
            path="/Result"
            element={
              <>
                <Header />
                <Result2 />
              </>
            }
          />
          <Route
            path="/manage"
            element={
              <>
                <Header />
                <ManageUserStatus />
              </>
            }
          />
          <Route
            path="/Resultpatient"
            element={
              <>
                <Header />
                <Resultpatient />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
