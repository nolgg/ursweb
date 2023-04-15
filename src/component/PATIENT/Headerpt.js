import React, { useState, useEffect,  } from 'react';
import { FiCode, FiMenu, FiX } from "react-icons/fi";
import './Headerpt.css';
import lg from '../Group52.png';

// import {render,root} from 'react-dom'


function HeaderDoc() { 
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
   
    
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
    )}
    

export default HeaderDoc;
