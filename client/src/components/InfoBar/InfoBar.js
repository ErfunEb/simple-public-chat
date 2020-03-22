import React from 'react';


import closeIcon from '../../icons/closeIcon.png';
import onlineIcon from '../../icons/onlineIcon.png';
import './InfoBar.css';




const InfoBar = ({ room }) => (
    <div className="infoBar">
        <div className="leftInnerContainer">
            <img className="onlineIcon" alt="online image" src={onlineIcon} />
            <h3>{room}</h3>
        </div>
        <div className="RightInnerContainer">
            <a href="/simple-public-chat/"><img src={closeIcon} className="offlineIcon" alt="close image icon" /></a>
        </div>
    </div>
);

export default InfoBar;