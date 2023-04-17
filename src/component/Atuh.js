import React, { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import Logo from "./auth/22.png";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
      setPending(false);
      console.log(currentUser.uid);
    });

    return () => unsubscribe();
  }, []);

  if (pending) {
    return (
      <>
        <center style={{ margin: "50px" }}>
          <img src={Logo} className="mt-2" />
          <div style={{ fontSize: "30px" }}>
            <div className="spinner-border mr-3" role="status"></div>
            Loading...
          </div>
        </center>
      </>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,setCurrentUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};