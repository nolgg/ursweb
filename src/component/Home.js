import React, { useState, useEffect, useContext } from 'react';
import "firebase/compat/app"
import 'firebase/firestore';
import Homedoc from './doc/homedoc'
import Homept from './PATIENT/homept';
import './Home.css';
import { AuthContext } from './Atuh';
import firebase from './../fbConfig.js';
import "./PATIENT/homept.css"
import "./doc/homedoc.css"


function Home() {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  console.log(click);
  const closeMobileMenu = () => setClick(false);
  const db = firebase.firestore();
  const { currentUser } = useContext(AuthContext);
  const [isDoctor, setIsDoctor] = useState(false);
  const [userInitials, setUserInitials] = useState('');

  useEffect(() => {
    if (currentUser) {
      const userId = currentUser.uid;
      db.collection('users').doc(userId).get()
        .then((doc) => {
          if (doc.exists) {
            console.log(doc.data()); // log the data to check if the doctorstatus field is set correctly
            setIsDoctor(doc.data().doctorstatus);
            setUserInitials(`${doc.data().firstName.charAt(0)}${doc.data().lastName.charAt(0)}`);
          } else {
            console.log('User not found');
          }
        })
        .catch((error) => {
          console.log(`Error getting user: ${error}`);
        });
    } else {
      console.log('No user currently logged in');
    }
  }, [currentUser]);

  if (isDoctor) {
    return (
      <Homedoc />
    );
  } else {
    return (
      <Homept />
    );
  }
}

export default Home;