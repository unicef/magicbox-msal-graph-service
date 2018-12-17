import React from 'react';

const ValidLogin = (props) => {
  return <div key="loggedIn">
    <div className="header">
      <a href="#default" className="logo"><img alt="UNICEF Innovation Logo" src={require('../../logo_primary_white.png')} /></a>
      <a href="#default" className="logo">Magicbox Maps</a>
      <div className="header-right">
        <a className="nav" id="logOut" onClick={props.logout}>Log Out</a>
      </div>
    </div>
  </div>
};

export default ValidLogin;
