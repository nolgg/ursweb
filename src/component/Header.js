import React, { useState, useContext, useEffect } from 'react'
import { FiCode, FiMenu, FiX } from "react-icons/fi";
import './Header.css'
import lg from './Group20.png'
import { AuthContext } from './Atuh';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';



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
      db.collection('user').doc(userId).get()
        .then((doc) => {
          if (doc.exists) {
            setIsDoctor(doc.data().doctorStatus);
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
      <div className="header" style={{boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)'}}>
        <div className="container">
          <div className="header-con z-depth-0 fixed-top">
            <div className="logo-container"  style={{marginLeft: "-100px",marginTop: '10px'}}>
              <a href="Home"> <img src={lg} style={{display:'relative' ,width:'150px',}}></img></a>
            </div>
            <ul className={click ? "menu active" : "menu"}>
              <li className="menu-link" onClick={closeMobileMenu}>
                <a href="/create">ADD PATIENT</a>
              </li>
              <li className="menu-link" onClick={closeMobileMenu}>
                <a href="#">PATIENT</a>
              </li>
              <li className="menu-link" onClick={closeMobileMenu}>
                <a href="Signup">SING UP</a>
              </li>
            </ul>
            <div className="user-profile-preview">
              {userInitials}
            </div>
            <div className="mobile-menu" onClick={handleClick}>
              {click ? (
                <FiX />
              ) : (
                <FiMenu />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
        <div className="header" style={{boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)'}}>
        <div className="container">
          <div className="header-con z-depth-0 fixed-top">
            <div className="logo-container"  style={{marginLeft: "-100px",marginTop: '10px'}}>
              <a href="Home"> <img src={lg} style={{display:'relative' ,width:'150px',}}></img></a>
            </div>
            <ul className={click ? "menu active" : "menu"}>
              <li className="menu-link" onClick={closeMobileMenu}>
                <a href="/create">ADD PATIENT</a>
              </li>
              <li className="menu-link" onClick={closeMobileMenu}>
                <a href="#">PATIENT</a>
              </li>
              <li className="menu-link" onClick={closeMobileMenu}>
                <a href="Signup">SIGN UP</a>
              </li>
              <li className="menu-link" onClick={closeMobileMenu}>
                <a href="Signin">SIGN IN</a>
              </li>
            </ul>
            <div className="user-profile-preview">
              {userInitials}
            </div>
            <div className="mobile-menu" onClick={handleClick}>
              {click ? (
                <FiX />
              ) : (
                <FiMenu />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;