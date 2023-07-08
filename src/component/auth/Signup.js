import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import firebase from "../../fbConfig.js";
import 'firebase/compat/auth';
import 'firebase/compat/app'
import './Signup.css';
import 'firebase/compat/firestore';
import Swal from 'sweetalert2';

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
    console.log("Login successful");

    // Show Swal pop-up for successful sign up
    Swal.fire({
      title: "Sign Up Successful",
      icon: "success",
      text: "You have successfully signed up!",
      confirmButtonText: "OK",
    }).then(() => {
      navigate("/") // replace this with the URL to navigate to after successful signup
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
    <body className='SignUp-bg'>
      <div className='right'><br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div className='font'>
        <h4 className='Signup-text'>
          Welcome
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

          <button type='submit'className='btn btn blue lighten-1 z-depth-1' style={{ marginTop: '15px', color: 'white', borderRadius: '20px',marginRight: '150px',background:'' }}>
            
            <a style={{ color: 'white' }}>Sign Up</a>
            
            </button>
          <div className='text' style={{ fontSize: '12px', marginTop: '25px', color: 'gray' }}>
          ALREADY HAVE AN ACCOUNT?   <a href='/signin'>  Log In </a>
          </div>
        </form>
        </div>
      </div>
    </body>
  );
};

export default SignUp;
