import React, { useState, useEffect, useContext } from 'react';
import { FiCode, FiMenu, FiX } from 'react-icons/fi';
import './HeaderDoc.css';
import lg from '../Icon.png';
import firebase from 'firebase/compat/app';
import 'firebase/firestore';
import { AuthContext } from './../Atuh';
import { useAuth } from './../Atuh';
import Swal from 'sweetalert2';

function HeaderDoc() {
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
        showConfirmButton: false,
      });
      window.location.href = '/signin';
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message,
      });
    }
  };

  useEffect(() => {
    if (currentUser) {
      const userId = currentUser.uid;
      db.collection('users')
        .doc(userId)
        .get()
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
    <div className="font header">
     
        <div className="header-con">
          <div className="logo-container">
            <a href="/">
              <img src={lg} alt="logo" />
            </a>
          </div>
          <ul className={click ? 'menu active' : 'menu'}>
            {currentUser ? (
              <>
                 <li className="menu-link" onClick={closeMobileMenu}>
                  <a href="/" className="textinmenu">
                    หน้าหลัก
                  </a>
                </li>
               <li className="menu-link" onClick={closeMobileMenu}>
                  <a href="/Service" className="textinmenu">
                    บริการ
                  </a>
                </li>

                <li className="menu-link" onClick={closeMobileMenu}>
                  <a href="/About" className="textinmenu">
                    เกี่ยวกับเรา
                  </a>
                </li>
                <li className="menu-link" onClick={closeMobileMenu}>
                  <a href="/Service" className="textinmenu">
                    เพิ่มเคส
                  </a>
                </li>
                <li className="menu-link" onClick={closeMobileMenu}>
                  <a href="/Resultpatient" className="textinmenu">
                    รายชื่อและผลตรวจ
                  </a>
                </li>

                <li className="menu-link" onClick={handleLogout}>
                  <a>ออกจากระบบ</a>
                </li>

                <li onClick={closeMobileMenu} className="btn btn-floating">
                  <a href="/profile">{userInitials}</a>
                </li>
              </>
            ) : (
              <>
                <li className="font menu-link" onClick={closeMobileMenu}>
                  <a href="/signin">เข้าสู่ระบบ</a>
                </li>
                <li className="menu-link" onClick={closeMobileMenu}>
                  <a href="/signup">สมัครสมาชิก</a>
                </li>
              </>
            )}
          </ul>
          <div className="mobile-menu" onClick={handleClick}>
                    {click ? <FiX className="menu-icon" /> : <FiMenu className="menu-icon" />}
                </div>
        </div>
      
    </div>
  );
}

export default HeaderDoc;
