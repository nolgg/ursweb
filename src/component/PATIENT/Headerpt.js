import React, { useState, useEffect, useContext } from 'react';
import { FiCode, FiMenu, FiX } from "react-icons/fi";
import './Headerpt.js';
import lg from '../Group52.png';
import firebase from 'firebase/compat/app';
import 'firebase/firestore';
import { AuthContext } from './../Atuh';

function HeaderDoc() {
    const [click, setClick] = useState(false);
    const [userInitials, setUserInitials] = useState('');
    const { currentUser } = useContext(AuthContext);
    
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);
    
    const db = firebase.firestore();
    
    useEffect(() => {
      if (currentUser) {
        const userId = currentUser.uid;
        db.collection('users').doc(userId).get()
          .then((doc) => {
            if (doc.exists) {
              setUserInitials(`${doc.data().initials}`);
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
    }, [currentUser, db]);

  return (
    <div className="header" style={{boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)'}}>
      <div className="container">
        <div className="header-con z-depth-0 fixed-top">
          <div className="logo-container"  style={{marginLeft: "-100px",marginTop: '10px'}}>
            <a href="Home"> <img src={lg} style={{display:'relative' ,width:'150px',}}></img></a>
          </div>
          <ul className={click ? "menu active" : "menu"}>
            
            <li className="menu-link" onClick={closeMobileMenu}>
              <a href="list"> ผลการตรวจ </a>
            </li>
            <li className="menu-link" onClick={closeMobileMenu}>
              <a href="/"> ออกจากระบบ </a>
            </li>
            {currentUser ? (
              <li onClick={closeMobileMenu} className="btn btn-floating #ffc107 amber" style={{borderRadius:"15px"}} >
                <a href="/profile">{userInitials}</a>
              </li>
            ) : null}
          </ul>
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

export default HeaderDoc;
