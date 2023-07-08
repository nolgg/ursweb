import React, { useState, useEffect, useContext } from "react";
import { FiCode, FiMenu, FiX } from "react-icons/fi";
import "./HeaderDoc.css";
import lg from "../Group52.png";
import firebase from "firebase/compat/app";
import "firebase/firestore";
import { AuthContext, useAuth } from "./../Atuh";
import Swal from "sweetalert2";

function HeaderDoc() {
  const [click, setClick] = useState(false);
  const [userInitials, setUserInitials] = useState("");
  const { currentUser } = useContext(AuthContext);
  const { logout } = useAuth();
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const db = firebase.firestore();
  
  const handleLogout = async () => {
    try {
      await logout();
      Swal.fire({
        icon: 'success',
        title: 'Logout complete',
        timer: 10000,
        showConfirmButton: false
      });
      window.location.href = '/';
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message
      });
    }
  }


  useEffect(() => {
    if (currentUser) {
      const userId = currentUser.uid;
      db.collection("users")
        .doc(userId)
        .get()
        .then((doc) => {
          if (doc.exists) {
            setUserInitials(`${doc.data().initials}`);
          } else {
            console.log("User not found");
          }
        })
        .catch((error) => {
          console.log(`Error getting user: ${error}`);
        });
    } else {
      console.log("No user currently logged in");
    }
  }, [currentUser, db]);

  return (
    <div className="font header" style={{boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)'}}>
      <div className="container">
        <div className="header-con z-depth-0 fixed-top">
          <div className="logo-container"  style={{marginLeft: "-100px",marginTop: '10px'}}>
            <a href="/"> <img src={lg} style={{display:'relative' ,width:'150px',}}></img></a>
          </div>
          <ul className={click ? "menu active" : "menu"}>
            {currentUser ? (
              <>
                <li className="menu-link" onClick={closeMobileMenu}>
                  <a className="fonttt" href="/create" style={{textAlign:"center",marginLeft:"30px"}} > เพิ่มผู้เข้ารับการตรวจ</a>

                </li>
                <li className="menu-link" onClick={closeMobileMenu}>
                  <a className="fonttt" href="/Result" style={{textAlign:"center",marginLeft:"30px"}} > รายชื่อผู้เข้ารับการตรวจ</a>

                </li>
                <li className="menu-link" onClick={handleLogout}>
                  <a className="fonttt" style={{textAlign:"center",marginLeft:"30px"}}> ออกจากระบบ </a>
                </li>
                <li onClick={closeMobileMenu} className="btn btn-floating #ffc107 amber" style={{borderRadius:"15px",marginLeft:"30px"}}>
                  <a className="fonttt" href="/profile"  style={{textAlign:"center",width:"10px",marginLeft:"30px"}} >{userInitials}</a>
                </li>
               
              </>
            ) : (
              <>
                <li className="menu-link" onClick={closeMobileMenu}>
                  <a href="/signin"> เข้าสู่ระบบ </a>
                </li>
                <li className="menu-link" onClick={closeMobileMenu}>
                  <a href="/signup"> สมัครสมาชิก </a>
                </li>
              </>
            )}
          </ul>
          <div className="mobile-menu" onClick={handleClick}>
            {click ? (
              <div className="close-icon"><FiX /></div>
              ) : (
              <div className="menu-icon"><FiMenu /></div>
              )}
              </div>
              </div>
              </div>
              </div>
              );
              }
  

export default HeaderDoc;
