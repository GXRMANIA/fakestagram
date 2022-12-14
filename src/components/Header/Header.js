import React from 'react';
import instagramLogo from "../../images/instagram_logo.png"
import { signout } from '../../firebase';

const Header = (props) => {
    return (
        <div className='header'>
            <span style={{visibility:'hidden'}} className="material-symbols-outlined">
                logout
            </span>
            <img alt="Instagram logo" src={instagramLogo}/>
            <span onClick={signout} className="material-symbols-outlined">
                logout
            </span>
        </div>
    );
}

export default Header;
