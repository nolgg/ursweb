import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import firebase from "../../fbConfig.js";
import 'firebase/compat/auth';
import 'firebase/compat/app'
import 'firebase/compat/firestore';
import Swal from 'sweetalert2';
import './SignUpForm.css';
import Icon from './Icon.png'

const SignUpForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [LastName, setLastName] = useState('');
  const [FirstName, setFirstName] = useState('');
  const [IDcard, setIDcard] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
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
        firstName: FirstName,
        lastName: LastName,
        IDcard: parseInt(IDcard),
        initials: FirstName[0] + LastName[0],
      });
      console.log("Login successful");

      // Show Swal pop-up for successful sign up
      Swal.fire({
        title: "Sign Up Successful",
        icon: "success",
        text: "You have successfully signed up!",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/");
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
    <div className='SignUp-bg'>
    <div className='right2'>
      <a href="/" style={{ color: '#007bff', textDecoration: 'none' }}>
        &lt; Back to Home
      </a>
      <div className='font'>
        <div className='icon-container'>
          <img src={Icon} alt='Icon' />
        </div>
        <h4 className='Signup-text'>
          Welcome To URS
        </h4>
          <form onSubmit={handleSignUp} className='formsignup'>
            <div className='row'>
              <div className='input-field col s6'>
                <input id='FirstName' type='text' onChange={(e) => setFirstName(e.target.value)} />
                <label htmlFor='FirstName'>First Name</label>
              </div>
              <div className='input-field col s6'>
                <input id='LastName' type='text' onChange={(e) => setLastName(e.target.value)} />
                <label htmlFor='LastName'>Last Name</label>
              </div>
            </div>
            <div className='input-field col s12'>
              <input id='IDcard' type='number' className='validate' onChange={(e) => setIDcard(e.target.value)} />
              <label htmlFor='IDcard'>IDcard</label>
              <span className='helper-text' data-error='wrong' data-success='right'></span>
            </div>
            <div className='input-field col s12'>
              <input id='email' type='email' className='validate' onChange={(e) => setEmail(e.target.value)} />
              <label htmlFor='email'>Email</label>
              <span className='helper-text' data-error='wrong' data-success='right'></span>
            </div>
            <div className='input-field col s12'>
              <input id='password' type='password' className='validate' onChange={(e) => setPassword(e.target.value)} />
              <label htmlFor='password'>Password</label>
            </div>
            <div className='input-field col s12'>
              <input
                id='confirmPassword'
                type='password'
                className='validate'
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <label htmlFor='confirmPassword'>Confirm Password</label>
            </div>
            <button type='submit' className='btn btn blue lighten-1 z-depth-1' style={{ marginTop: '15px', color: 'white', borderRadius: '20px', marginRight: '150px', background: '' }}>
              <a style={{ color: 'white' }}>Sign Up</a>
            </button>
            <div className='text' style={{ fontSize: '12px', marginTop: '2vh', color: 'gray' }}>
            ALREADY HAVE AN ACCOUNT? <a href='/signin'>Log In</a>
          </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
