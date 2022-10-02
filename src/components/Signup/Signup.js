import React from 'react';
import { Link } from 'react-router-dom';
import { signup } from '../../firebase';
import { useState } from 'react';
import './Signup.css';
import instagramLogo from '../../images/instagram_logo.png';

const Signup = () => {
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [usernameInput, setUsernameInput] = useState('');

  function handleEmailChange(e) {
    setEmailInput(e.target.value);
  }
  function handlePasswordChange(e) {
    setPasswordInput(e.target.value);
  }
  function handleUsernameChange(e) {
    setUsernameInput(e.target.value);
  }
  function handleSignUpClick(e) {
    let passwordConfirmInput = document.querySelector('.passwordConfirm').value;
    if (passwordConfirmInput !== passwordInput) return;
    signup(emailInput, passwordInput, usernameInput);
  }

  return (
    <form className="signup">
      <img alt="Instagram logo" src={instagramLogo} />
      <input
        onChange={handleUsernameChange}
        type="text"
        placeholder="Username"
      />
      <input onChange={handleEmailChange} type="text" placeholder="E-Mail" />
      <input
        autoComplete="on"
        onChange={handlePasswordChange}
        type="password"
        placeholder="Password"
      />
      <input
        autoComplete="on"
        className="passwordConfirm"
        type="password"
        placeholder="Password Confirm"
      />
      <Link to="/">
        <button onClick={handleSignUpClick}>Sign up</button>
      </Link>
      <div>
        Already have an account?
        <Link to="/"> Log In!</Link>
      </div>
    </form>
  );
};

export default Signup;
