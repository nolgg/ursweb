import React, { useState, useEffect, useContext } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import { AuthContext, useAuth } from "./../Atuh";
import firebase from "firebase/compat/app";
import "firebase/firestore";
import Swal from "sweetalert2";
import lg from "../Group52.png";
import "./HeaderDoc.css";

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
        icon: "success",
        title: "Logout complete",
        timer: 10000,
        showConfirmButton: false,
      });
      window.location.href = "/";
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    }
  };

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
    <div className="header font">
      <div className="container">
        <div className="header-con">
          <div className="logo-container">
            <Link to="/">
              <img src={lg} alt="Logo" />
            </Link>
          </div>

          <nav className={click ? "menu active" : "menu"}>
            {currentUser ? (
              <>
                <Link
                  to="/create"
                  className="menu-link"
                  onClick={closeMobileMenu}
                >
                  เพิ่มผู้เข้ารับการตรวจ
                </Link>
                <Link
                  to="/Result"
                  className="menu-link"
                  onClick={closeMobileMenu}
                >
                  รายชื่อผู้เข้ารับการตรวจ
                </Link>
                <Link
                  to="/adddevice"
                  className="menu-link"
                  onClick={closeMobileMenu}
                >
                  เพิ่มเลขเครื่อง
                </Link>
                <span className="menu-link" onClick={handleLogout}>
                  ออกจากระบบ
                </span>
                <Link to="/profile" className="btn btn-floating #ffc107 amber">
                  {userInitials}
                </Link>
              </>
            ) : (
              <>
                <Link to="/signin" className="menu-link" onClick={closeMobileMenu}>
                  เข้าสู่ระบบ
                </Link>
                <Link to="/signup" className="menu-link" onClick={closeMobileMenu}>
                  สมัครสมาชิก
                </Link>
              </>
            )}
          </nav>

          <div className="mobile-menu" onClick={handleClick}>
            {click ? <FiX /> : <FiMenu />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderDoc;
