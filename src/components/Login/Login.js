import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { login } from '../../firebase';
import "./Login.css"
import instagramLogo from "../../images/instagram_logo.png"

const Login = (props) => {
    const [emailInput, setEmailInput] = useState("")
    const [passwordInput, setPasswordInput] = useState("")

    function handleEmailChange(e) {
        setEmailInput(e.target.value)
    }
    function handlePasswordChange(e) {
        setPasswordInput(e.target.value)
    }
    function handleLoginClick(e) {
        e.preventDefault();
        login(emailInput, passwordInput)
    }

    let loginButton;
    if(props.loggedIn) {
        loginButton = <Link to="/app"><button onClick={handleLoginClick}>Log In</button></Link>
    } else {
        loginButton = <button onClick={handleLoginClick}>Log In</button>
    }

    return (
        <form className='login'>
            <img alt="Instagram logo" src={instagramLogo}/>
            <input onChange={handleEmailChange} type="text" placeholder='E-Mail'/>
            <input autoComplete="on" onChange={handlePasswordChange} type="password" placeholder='Password'/>
            {loginButton}
            <div>Need an account?  
                <Link to="/signup"> Sign up!</Link>
            </div>
        </form>
    );
}

export default Login;
