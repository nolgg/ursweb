import React, { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import Logo from "./auth/22.png";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentIDcard, setCurrentIDcard] = useState(null);
  const [pending, setPending] = useState(true);

  const logout = () => {
    firebase.auth().signOut();
  };

  const getCurrentIDcard = async (currentUser) => {
    try {
      if (!currentUser) {
        console.log("No user is currently logged in.");
        return null;
      }

      const db = firebase.firestore();
      const userDocRef = db.collection("users").doc(currentUser.uid);
      const doc = await userDocRef.get(IDcard);
      
      if (doc.exists) {
        const userData = doc.data();
        const idCard = userData.IDcard;
        setCurrentIDcard(idCard);
        console.log("User ID card:", idCard);
        return idCard;
      } else {
        console.log("No such document! shit");
      }
    } catch (error) {
      console.error("Error getting user ID card", error);
      
    }
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
      setPending(false);
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
        currentUser,
        setCurrentUser,
        logout,
        getCurrentIDcard,
        currentIDcard,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
