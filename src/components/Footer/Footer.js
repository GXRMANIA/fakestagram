import React from 'react';
import uploadIcon from "../../images/upload_icon.svg"

const Footer = (props) => {
    return (
        <div className='footer'>
            <label onChange={props.handleFilePick} className="filePicker custom-file-upload">
                <input type="file"/>
                <img alt="upload icon" src={uploadIcon}/>
            </label>
        </div>
    );
}

export default Footer;
