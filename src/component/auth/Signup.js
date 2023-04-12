import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import "./Signup.css"


function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [LastName, setLastName] = useState('');
  const [FirstName, setFirstName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      navigate.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <body className='SignUp-bg'>
    <div className=' right' >
      <h4 className="Login-text " style={{fontSize:'40px',marginTop:'250px' ,marginRight:'375px'}}>Welcome </h4>
      <form onSubmit={handleSignUp}>
         <form class="col s12">
      <div class="row">
    <form class="col s12">
      <div class="row">
        <div class="input-field col s12 ">
          <input id="email" type="email" class="validate"/>
          <label for="email">Email</label>
          <span class="helper-text" data-error="wrong" data-success="right" onChange={(e) => setEmail(e.target.value)}></span>
        </div>
        <div class="input-field col s12">
          <input id="FirstName" type="text" onChange={(e) => setFirstName(e.target.value)} />
          <label for="FirstName">FirstName</label>
        </div>
      </div>
        <div class="input-field col s12">
          <input id="LastName" type="text" onChange={(e) => setLastName(e.target.value)} />
          <label for="LastName">LastName</label>
        </div>
        <div class="input-field col s12">
          <input id="password" type="password" class="validate"onChange={(e) => setPassword(e.target.value)} />
          <label for="password">Password</label>
        </div>
        
        <div class="input-field col s12">
          <input id="password" type="password" class="validate" onChange={(e) => setConfirmPassword(e.target.value)} />
          <label for="password">Confirm Password</label>
        </div>

         
      
        <button type="submit">Sign Up</button>
      </form>
      </div>
      </form>
      </form>
    </div>
    </body>
    
  );
}

export default SignUp;
