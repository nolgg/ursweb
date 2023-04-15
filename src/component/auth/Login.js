import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import Swal from 'sweetalert2';
import bg from './pp.png';
import lg from './22.png';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      navigate('/docter');
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
          <h4 className='Login-text' style={{ fontSize: '40px', marginTop: '250px', marginRight: '475px' }}>
            Welcome{' '}
          </h4>
          <h5 className='Login-text' style={{ fontSize: '15px', marginRight: '390px' }}>
            Sign In
          </h5>
          <form onSubmit={handleLogin} className='Login-text2' style={{ marginRight: '225px' }}>
            <div className='row'>
              <div className='row'>
                <div className='input-field col s12'>
                  <input id='email' type='email' className='validate' onChange={(e) => setEmail(e.target.value)} />
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
              className='btn btn blue lighten-1 z-depth-1'
              style={{ marginTop: '15px', color: 'white', borderRadius: '20px' }}
            >
              Login
            </button>
          </form>
          <div className=' red-text'>{/* { authError ? <p>{authError}</p> : null } */}</div>
          <div className='text' style={{ fontSize: '12px', marginTop: '25px', color: 'gray' }}>
            DON’T HAVE ACCOUNT?<a href='/signup'>Sign up Now</a>
          </div>
        </div>
      </div>
    </body>
  );
}

export default Login;
