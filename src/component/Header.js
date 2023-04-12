import React, { useState, useEffect } from 'react';
import { FiCode, FiMenu, FiX } from "react-icons/fi";
import './Header.css';
import lg from './Group20.png';
import 'firebase/compat/firestore';
import firebase from 'firebase/compat/app';

function Header() { 
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const [users, setUsers] = useState(null); // add state to store users data

  useEffect(() => {
    // fetch users data from Firestore when component mounts
    const db = firebase.firestore();
    const usersRef = db.collection('users').doc('your_user_id');
    usersRef.get().then((doc) => {
      if (doc.exists) {
        setUsers(doc.data());
      } else {
        console.log('No such document!');
      }
    }).catch((error) => {
      console.log('Error getting document:', error);
    });
  }, []);

    
    if(users === null){
        return (
    
    
            <div className="header" style={{boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)'}}>
              <div className="container">
                <div className="header-con z-depth-0 fixed-top">
                        <div className="logo-container"  style={{marginLeft: "-100px",marginTop: '10px'}}>
                            <a href="Home"> <img src={lg} style={{display:'relative' ,width:'150px',}}></img></a>
                        </div>
                        <ul className={click ? "menu active" : "menu"}>
                            <li className="menu-link" onClick={closeMobileMenu}>
                                <a href="signin">SIGN IN</a>
                            </li>
                            <li className="menu-link" onClick={closeMobileMenu}>
                                <a href="Signup">SIGN UP</a>
    
                            </li>
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
        )
         }
   if (users.Doctor == true){
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
                            <a href="Overview">OVERVIEW</a>

                        </li>
                        {/* <li className="menu-link" onClick={closeMobileMenu}>
                            <link href="SignIn" >SignIn</link>
                            {links}
                        </li> */}
                       
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
    )}
    else{
    return (


        <div className="header" style={{boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)'}}>
          <div className="container">
            <div className="header-con z-depth-0 fixed-top">
                    <div className="logo-container"  style={{marginLeft: "-100px",marginTop: '10px'}}>
                        <a href="Home"> <img src={lg} style={{display:'relative' ,width:'150px',}}></img></a>
                    </div>
                    
                        <li className="menu-link" onClick={closeMobileMenu}>
                            <a href="history">SUMMARY</a>
                        </li>
                        <li className="menu-link" onClick={closeMobileMenu}>
                            <a href="signout">SIGN OUT</a>

                        </li>
                        {/* <li className="menu-link" onClick={closeMobileMenu}>
                            <link href="SignIn" >SignIn</link>
                            {links}
                        </li> */}
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
    )
     }

}

export default Header;
