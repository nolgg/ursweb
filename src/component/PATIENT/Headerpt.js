import React, { useState, useEffect, useContext} from 'react';
import { FiCode, FiMenu, FiX } from "react-icons/fi";
import './Headerpt.css';
import lg from '../Group52.png';
import firebase from 'firebase/compat/app';
import 'firebase/firestore';
import { AuthContext } from './../Atuh';
import { useAuth } from './../Atuh';
import Swal from 'sweetalert2';

function Headerp() {
  const [click, setClick] = useState(false);
  const [userInitials, setUserInitials] = useState('');
  const { currentUser } = useContext(AuthContext);
  const { logout } = useAuth();
  const db = firebase.firestore();

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const handleLogout = async () => {
    try {
      await logout();
      Swal.fire({
        icon: 'success',
        title: 'Logout complete',
        timer: 3000,
        showConfirmButton: false
      });
      window.location.href = '/signin';
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
    <div className="font header" style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)' }}>
  <div className="font container">
    <div className="header-con z-depth-0 fixed-top">
      <div className="logo-container" style={{ marginLeft: "-100px", marginTop: '10px' }}>
        <a href="/">
          <img src={lg} style={{ display: 'relative', width: '150px' }} alt="logo" />
        </a>
      </div>
      <ul className={click ? "menu active" : "menu"}>
        {currentUser ? (
          <>
            <li className="menu-link" onClick={closeMobileMenu}>
              <a href="/Resultpatient" className="textinmenu" style={{textAlign:"center",marginLeft:"30px"}}>ผลการตรวจ</a>
            </li>
           
            <li className="menu-link" onClick={handleLogout}>
              <a style={{textAlign:"center",marginLeft:"30px"}}>ออกจากระบบ</a>
            </li>

            <li onClick={closeMobileMenu} className="btn btn-floating" style={{ borderRadius: "15px",marginLeft:"30px"}}>
              <a href="/profile" style={{textAlign:"center",width:"100px",marginLeft:"30px"}}>{userInitials}</a>
            </li>
          </>
        ) : (
            <>
              <li className="font menu-link" onClick={closeMobileMenu}>
                <a href="/signin" style={{textAlign:"center",marginLeft:"30px"}}>เข้าสู่ระบบ</a>
              </li>
              <li className="menu-link" onClick={closeMobileMenu}>
                <a href="/signup" style={{textAlign:"center",marginLeft:"30px"}}>สมัครสมาชิก</a>
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
              
              export default Headerp;
