import React, { useState, useEffect } from 'react';
import { FiCode, FiMenu, FiX } from "react-icons/fi";
import './Header.css';
import lg from './Group52.png';
import 'firebase/compat/firestore';
import firebase from 'firebase/compat/app';
// import {render,root} from 'react-dom'


function Header() { 
    const [click, setClick] = useState(false);
    const [user, setUser] = useState(null);
    
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);
  
    useEffect(() => {
      // fetch user data from Firestore when component mounts
      const db = firebase.firestore();
      const currentUser = firebase.auth().currentUser;
      if (currentUser) {
        const userRef = db.collection('users').doc(currentUser.uid);
        userRef.get().then((doc) => {
          if (doc.exists) {
            setUser(doc.data());
          } else {
            console.log('No such document!');
          }
        }).catch((error) => {
          console.log('Error getting document:', error);
        });
      }
    }, []);

    if(user == null){
        return (
    
    
            <div className="header" style={{boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)'}}>
              <div className="container">
                <div className="header-con z-depth-0 fixed-top">
                        <div className="logo-container"  style={{marginLeft: "-100px",marginTop: '10px'}}>
                            <a href="Home"> <img src={lg} style={{display:'relative' ,width:'180px',}}></img></a>
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
   if (user.Doctor == true){
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
                        {/* <li onClick={closeMobileMenu} className="btn btn-floating #ffc107 amber" style={{borderRadius:"15px"}} >
                        {props.users.initials} <link href="/" ></link>
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
