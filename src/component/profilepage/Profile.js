import React, { useState, useEffect, useContext } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import './Profile.css';
import { AuthContext } from '../Atuh';

const Profile = () => {
  const { currentUser } = useContext(AuthContext);
  const [isDoctor, setIsDoctor] = useState(false);
  const [userInitials, setUserInitials] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [IDcard, setIDcard] = useState('');

  useEffect(() => {
    if (!currentUser) {
      console.log('No user currently logged in');
      return;
    }

    const userId = currentUser.uid;
    const userRef = firebase.firestore().collection('users').doc(userId);

    userRef.get()
      .then((doc) => {
        if (!doc.exists) {
          console.log('User not found');
          return;
        }

        const data = doc.data();
        setIsDoctor(data.doctorstatus);
        setUserInitials(`${data.firstName[0]}${data.lastName[0]}`);
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setIDcard(data.IDcard);
      })
      .catch((error) => console.log(`Error fetching user data: ${error.message}`));
  }, [currentUser]);

  return (
    <div className="profile-container">
      <a href="/" className="backtopage">กลับหน้าหลัก</a>
      <div className="profile-header">
        <div className="profile-header-content">
          <div className="profile-image">
            <img src={`https://ui-avatars.com/api/?name=${userInitials}&background=random&size=100`} alt="Profile" />
          </div>
          <div className="profile-info">
            <h2>{`${firstName} ${lastName}`}</h2>
            {isDoctor && <p>คุณหมอ</p>}
          </div>
        </div>
      </div>
      <div className="profile-details">
        <h3>ข้อมูลโปรไฟล์</h3>
        <ProfileDetail label="ชื่อจริง:" value={firstName} />
        <ProfileDetail label="นามสกุล:" value={lastName} />
        <ProfileDetail label="เลขบัตรประชาชน:" value={IDcard} />
        <ProfileDetail label="หมายเลข URS-device" value={IDcard} />
      </div>
    </div>
  );
};

const ProfileDetail = ({ label, value }) => (
  <div className="detail-item">
    <span className="detail-label">{label}</span>
    <span>{value}</span>
  </div>
);

export default Profile;
