import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import './managestatus.css'

const firestore = firebase.firestore();

function ManageUserStatus() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore.collection('users').onSnapshot((snapshot) => {
      const updatedUsers = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setUsers(updatedUsers);
    });

    return unsubscribe;
  }, []);

  const handleDoctorStatusChange = (userId, doctorStatus) => {
    firestore.collection('users').doc(userId).update({
      doctorstatus: doctorStatus
    }).then(() => {
      console.log('Document updated');
    }).catch((error) => {
      console.error('Error updating document: ', error);
    });
  };

  const handleAddDoctorStatus = (userId) => {
    firestore.collection('users').doc(userId).update({
      doctorstatus: false
    }).then(() => {
      console.log('Document updated');
    }).catch((error) => {
      console.error('Error updating document: ', error);
    });
  };

  return (
    <div className="manage-user-status-container">
      <h1 className="manage-user-status-heading">Manage User Status</h1>
      <ul className="manage-user-status-list">
        {users.map((user) => (
          <li key={user.id} className="manage-user-status-item">
            <span className="manage-user-status-name">{user.firstName}</span>
            <span className="manage-user-status-email"> ({user.email})</span>
            <span className="manage-user-status-doctor-status">
              Doctor Status: {user.doctorstatus ? 'True' : 'False'}
            </span>
            {user.doctorstatus === undefined && (
              <button
                className="manage-user-status-add-doctor-status-button"
                onClick={() => handleAddDoctorStatus(user.id)}
              >
                Add Doctor Status
              </button>
            )}
            <button
              className="manage-user-status-toggle-doctor-status-button"
              onClick={() => handleDoctorStatusChange(user.id, !user.doctorstatus)}
            >
              Toggle Doctor Status
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ManageUserStatus;
