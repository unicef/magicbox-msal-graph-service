import React from 'react';

const InvalidLogin = (props) => {
 return <div>
  <div className="header">
    <a href="#default" className="logo"><img alt="UNICEF Innovation Logo" src={require('../../logo_primary_white.png')} /></a>
    <a href="#default" className="logo">Magicbox Maps</a>
    <div className="header-right">
      <a className="nav" id="logIn" onClick={props.login}>Log In</a>
    </div>
  </div>
  <div className="App-container-div-2">
    <div className="App-sub-container-login-failed">
    <h4>Something went wrong</h4>
      <p className="align-left">Please <a className="inline" onClick={props.login}>try logging in</a> again.
      <br></br>If you are a non-UNICEF partner or academic collaborator who does not yet have an account, please <a href="mailto:cpalau@unicef.org, mfabrikant@unicef.org?subject=Magicbox Access Request"> email us</a> to request access.
      <br></br>
      <br></br>Return <a onClick={props.redirectHome} className="inline">home</a>
      </p>
    </div>
  </div>
</div>
};

export default InvalidLogin;
