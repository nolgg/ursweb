import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import './Signup.css';
import 'firebase/compat/firestore';

const SignUp = () => {
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
        console.log("Login succec"); // replace this with the URL to navigate to after successful signup
      } catch (error) {
        console.error(error);
      }
    };
  

  return (
    <body className='SignUp-bg'>
      <div className='right'><br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
        <h4 className='Login-text' style={{ fontSize: '40px', marginTop: '250px', marginRight: '475px' }}>
          Welcome
        </h4>
        <form onSubmit={handleSignUp}>
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
           <div class='input-field col s12 '>
              <input id='IDcard' type='number' class='validate' onChange={(e) => setIDcard(e.target.value)} />
              <label for='IDcard'>IDcard</label>
              <span class='helper-text' data-error='wrong' data-success='right'></span>
            </div>
          <div class='input-field col s12 '>
              <input id='email' type='email' class='validate' onChange={(e) => setEmail(e.target.value)} />
              <label for='email'>Email</label>
              <span class='helper-text' data-error='wrong' data-success='right'></span>
            </div>
            
          <div class='input-field col s12'>
            <input id='password' type='password' class='validate' onChange={(e) => setPassword(e.target.value)} />
            <label for='password'>Password</label>
          </div>

          <div class='input-field col s12'>
            <input
              id='confirmPassword'
              type='password'
              class='validate'
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <label for='confirmPassword'>Confirm Password</label>
          </div>

          <button type='submit'className='btn btn blue lighten-1 z-depth-1' style={{ marginTop: '15px', color: 'white', borderRadius: '20px',marginRight: '215px',background:'' }}>
            
            <a href='/signin'>Sign Up</a>
            
            </button>
          <div className='text' style={{ fontSize: '12px', marginTop: '25px', color: 'gray' }}>
          ALREADY HAVE AN ACCOUNT?   <a href='/signin'>  Log In </a>
          </div>
        </form>
      </div>
    </body>
  );
};

export default SignUp;
