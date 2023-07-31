import React, { useState, useEffect, useContext } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import './Profile.css';
import { AuthContext } from './../Atuh';

function Profile() {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const db = firebase.firestore();
  const { currentUser } = useContext(AuthContext);
  const [isDoctor, setIsDoctor] = useState(false);
  const [userInitials, setUserInitials] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [IDcard, setIDcard] = useState('');

  useEffect(() => {
    if (currentUser) {
      const userId = currentUser.uid;
      db.collection('users')
        .doc(userId)
        .get()
        .then((doc) => {
          if (doc.exists) {
            setIsDoctor(doc.data().doctorstatus);
            setUserInitials(
              `${doc.data().firstName.charAt(0)}${doc.data().lastName.charAt(0)}`
            );
            setFirstName(doc.data().firstName);
            setLastName(doc.data().lastName);
            setIDcard(doc.data().IDcard);
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

  return (
    <div className="profile-container">
      <a href="/">กลับหน้าหลัก</a>
      <div className="profile-header">
        <div className="profile-header-content">
          <div className="profile-image">
            <img
              src={`https://ui-avatars.com/api/?name=${userInitials}&background=random&size=100`}
              alt="Profile"
            />
          </div>
          <div className="profile-info">
            <h2>{`${firstName} ${lastName}`}</h2>
            {isDoctor && <p>คุณหมอ</p>}
          </div>
        </div>
      </div>
      <div className="profile-details">
        <h3>ข้อมูลโปรไฟล์</h3>
        <div className="detail-item">
          <span className="detail-label">ชื่อจริง:</span>
          <span>{firstName}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">นามสกุล:</span>
          <span>{lastName}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">เลขบัตรประชาชน:</span>
          <span>{IDcard}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">หมายเลข URS-device</span>
          <span>{IDcard}</span>
        </div>
      </div>
    </div>
  );
}

export default Profile;
