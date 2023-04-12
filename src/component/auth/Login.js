import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import bg from './pp.png'
import lg from './22.png'
import "./Login.css"

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      const user = firebase.auth().currentUser;
      const userRef = firebase.firestore().collection('users').doc(user.uid);
      await userRef.set({
        firstName: firstName,
        lastName: lastName,
      }, { merge: true });
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };
 
  return (
    <body className='Login-bg'>
      <div className='right'>
        <div className="container">
          <h4 className="Login-text " style={{fontSize:'40px',marginTop:'250px' ,marginRight:'475px'}}>Welcome </h4>
          <h5 className="Login-text" style={{fontSize:'15px' ,marginRight:'390px'}}>Sign In</h5>
          <form onSubmit={handleLogin} className="Login-text2 " style={{marginRight:'225px'}}>
            <div class="row">
              <div class="row">
                <div class="input-field col s6">
                  <input id="first_name" type="text" class="validate" onChange={(e) => setFirstName(e.target.value)} />
                  <label for="first_name">First Name</label>
                </div>
                <div class="input-field col s6">
                  <input id="last_name" type="text" class="validate" onChange={(e) => setLastName(e.target.value)} />
                  <label for="last_name">Last Name</label>
                </div>
              </div>
              <div class="row">
                <div class="input-field col s12">
                  <input id="email" type="email" class="validate" onChange={(e) => setEmail(e.target.value)} />
                  <label for="email">Email</label>
                </div>
              </div>
              <div class="row">
                <div class="input-field col s12">
                  <input id="password" type="password" class="validate" onChange={(e) => setPassword(e.target.value)} />
                  <label for="password">Password</label>
                </div>
              </div>
            </div>
            </form>
            <button className="btn btn blue lighten-1 z-depth-1" style={{marginTop:'15px',color:'white',borderRadius:"20px"}}>Login</button>
            <div className=" red-text">
              {/* { authError ? <p>{authError}</p> : null } */}
            </div>
            <div className="text" style={{fontSize:'12px',marginTop:'25px',color:'gray'}}   >
               DON’T HAVE ACCOUNT?<a href="/signup">Sign up Now</a>
            </div>
          </div>
        </div>
    </body>  
  );
}

export default Login;