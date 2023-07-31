import React from 'react';
import SignUpForm from './SignUpForm.js';
import MobileSignUp from './MobileSignUp';

const SignUp = () => {
  const isMobile = window.innerWidth <= 100;

  return (
    <div className='SignUp-bg'>
      {isMobile ? <MobileSignUp /> : <SignUpForm />}
    </div>
  );
};

export default SignUp;