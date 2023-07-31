import React, { useState } from 'react';
import firebase from "../../fbConfig.js";
import 'firebase/compat/auth';
import 'firebase/compat/app'
import 'firebase/compat/firestore';
import Swal from 'sweetalert2';
import './MobileSignUp.css'

const MobileSignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const firestore = firebase.firestore();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    try {
      const authResult = await firebase.auth().createUserWithEmailAndPassword(email, password);
      const userUid = authResult.user.uid;
      await firestore.collection('users').doc(userUid).set({
        initials: email[0].toUpperCase(),
      });
      console.log("Login successful");

      // Show Swal pop-up for successful sign up
      Swal.fire({
        title: "Sign Up Successful",
        icon: "success",
        text: "You have successfully signed up!",
        confirmButtonText: "OK",
      }).then(() => {
        // Redirect to the homepage or any other desired page after successful signup
      });

    } catch (error) {
      console.error(error);

      // Show Swal pop-up for error
      Swal.fire({
        title: "Sign Up Failed",
        icon: "error",
        text: error.message,
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className='right1'>
         <a href="/" style={{ color: '#007bff', textDecoration: 'none' }}>
          &lt; Back to Home
        </a>
      <div className='font'>
        <h4 className='Signup-text'>
          Welcome (Mobile Version)
        </h4>
        <form onSubmit={handleSignUp} className='formsignup'>
          <div className='input-field'>
            <input
              id='email'
              type='email'
              className='validate'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor='email'>Email</label>
          </div>
          <div className='input-field'>
            <input
              id='password'
              type='password'
              className='validate'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor='password'>Password</label>
          </div>
          <div className='input-field'>
            <input
              id='confirmPassword'
              type='password'
              className='validate'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <label htmlFor='confirmPassword'>Confirm Password</label>
          </div>
          <button type='submit' className='btn btn-blue'>
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default MobileSignUp;
