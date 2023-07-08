import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/app'
import Swal from 'sweetalert2';
import './Login.css';
import { AuthContext } from './../Atuh.js';
import firebase from '../../fbConfig.js';



function Login() {
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
    <body className='Login-bg'>
      <div className='right'>
        <div className='container'>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        
          <h4 className=' Login-text'>
            Welcome
          </h4>
          
          <form onSubmit={handleLogin} className='Login-text2' style={{ marginRight: '22.5vh', width:"32vh" }}>
            <div className='row'>
              <div className='row'>
                <div className='input-field col s12'>
                  <input id='email' type='email' className='validate' onChange={(e) => setEmail(e.target.value)} styple={{width:"30px"}}/>
                  <label htmlFor='email'>Email</label>
                </div>
              </div>
              <div className='row'>
                <div className='input-field col s12'>
                  <input
                    id='password'
                    type='password'
                    className='validate'
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label htmlFor='password'>Password</label>
                </div>
              </div>
            </div>
            <button
              type='submit'
              className=' Login-btn'
              
              
            >
              Login
            </button>
          </form>
          <div className='text' style={{ fontSize: '12px', marginTop: '2vh', color: 'gray' }}>
            DON’T HAVE ACCOUNT?<a href='/signup'>Signup Now</a>
       
          </div>
        </div>
      </div>
    </body>
  );
}

export default Login;
