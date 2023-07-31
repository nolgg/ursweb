import React, { useState, useContext } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import './Adddevice.css';
import { AuthContext } from './../Atuh.js';

const AddDevice = () => {
  const [deviceNumber, setDeviceNumber] = useState('');
  const { currentUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentUser) {
      console.log('No user currently logged in');
      return;
    }

    try {
      const db = firebase.firestore();

      // Set the document ID to the current user ID
      const docRef = db.collection('users').doc(currentUser.uid);

      // Update the device number field in the document
      await docRef.update({
        deviceNumber: deviceNumber.trim(),
      });

      // Clear the input field
      setDeviceNumber('');

      // Redirect to the desired page (e.g., "/dashboard")
      // Replace the line below with the desired redirection logic
      window.location.href = '/dashboard';
    } catch (error) {
      console.error('Error updating device number:', error);
    }
  };

  const handleInputChange = (e) => {
    setDeviceNumber(e.target.value);
  };

  return (
    <div className="add-device-container">
      <h1 className="add-device-title">Add Device</h1>
      <form className="add-device-form" onSubmit={handleSubmit}>
        <div className="add-device-input">
          <label htmlFor="deviceNumber">Device Number :</label>
          <input
            id="deviceNumber"
            type="text"
            name="deviceNumber"
            value={deviceNumber}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="add-device-button">
          Add
        </button>
      </form>
    </div>
  );
};

export default AddDevice;
