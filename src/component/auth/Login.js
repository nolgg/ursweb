import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import firebase from "../../fbConfig.js";
import 'firebase/compat/auth';
import 'firebase/compat/app'
import 'firebase/compat/firestore';
import Swal from 'sweetalert2';
import './Login.css';
import { AuthContext } from './../Atuh.js';
import Icon from './Icon.png'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(AuthContext);
  const auth = firebase.auth();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await auth.signInWithEmailAndPassword(email, password);
      setCurrentUser(auth.currentUser);
      navigate('/');
    } catch (error) {
      console.error(error);
      if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Incorrect email or password',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'An error occurred. Please try again later.',
        });
      }
    }
  };

  return (
    <div className='Login-bg'>
      <div className='right'>
      <a href="/" style={{ color: '#007bff', textDecoration: 'none' }}>
          &lt; Back to Home
        </a>
        <div className='font'>
        <div className='icon-container'>
              <img src={Icon} alt='Icon' />
            </div>
          <h4 className='Login-text'>
            Welcome To URS
          </h4>
          <form onSubmit={handleLogin} className='formsignup'>
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
            <button
              type='submit'
              className='btn btn-blue'
            >
              Login
            </button>
          </form>
          <div className='text' style={{ fontSize: '12px', marginTop: '2vh', color: 'gray' }}>
            DON’T HAVE AN ACCOUNT? <a href='/signup'>Sign Up Now</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
