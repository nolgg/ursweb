import React, { useState, useContext, useEffect } from 'react'
import { FiCode, FiMenu, FiX } from "react-icons/fi";

import lg from './Group20.png'
import { AuthContext } from './Atuh';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import Headerp from './PATIENT/Headerpt';
import HeaderDoc from './doc/HeaderDoc';
import Swal from 'sweetalert2';


function Header() { 
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
      <HeaderDoc />
    );
  } else {
    return (
      <Headerp />
    );
  }
}

export default Header;