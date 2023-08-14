import firebase from "./fbConfig.js";
import Header from "./component/Header";
import Home from "./component/Home";
import React, { useContext } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./component/auth/Login.js";
import SignUp from "./component/auth/Signup.js";
import Addp from "./component/doc/Addp.js";
import Profile from "./component/profilepage/Profile.js";
import AddDevice from "./component/doc/adddevice.js";
import Service from "./component/Service.js";
import AboutUs from "./component/Aboutus.js";
import Footer from "./component/foothead/Footer.js";


import { Home2 } from "./component/Newcomponent/Home2.js";
import NavigationBar from "./component/foothead/NavigationBar.js";



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
            path="/Service"
            element={
              <>
                <Header />
                <Service />
                <Footer />
              </>
            }
          />

            <Route
            path="/About"
            element={
              <>
                <Header />
                <AboutUs />
                <Footer />
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
            path="/testhome"
            element={
              <>
                
                <Header />
                <Home2 />
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
            path="/adddevice"
            element={
              <>
                <Header />
                <AddDevice />
              </>
            }
          />
          <Route
            path="/admin"
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
          <Route
            path="/profile"
            element={
              <>
                <Profile />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
