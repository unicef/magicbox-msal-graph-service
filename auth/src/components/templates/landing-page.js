import React from 'react';

const LandingPage = (props) => {

  return <div>
    <div key="loggedIn">
    <div className="header">
      <a href="#default" className="logo"><img alt="UNICEF Innovation Logo" src={require('../../logo_primary_white.png')} /></a>
      <a href="#default" className="logo">Magicbox Maps</a>
      <div className="header-right">
        <a className="nav" onClick={props.login}>Log In</a>
        <a className="nav" href="https://github.com/unicef/magicbox-msal-graph-service">Github</a>
      </div>
    </div>
    </div>
    <div className="App-container">
    <div className="App-container-div-1">
      <div className="App-sub-container">
      <h4>Magicbox maps</h4>
        <p className="align-left">
          The mapping application behind this login is just a value proposition of Magicbox.
        </p>
      </div>
    </div>
      <div className="App-container-div-2">
        <div className="App-sub-container">
        <h4>Magicbox</h4>
        <h3>
        Magicbox is about preparing UNICEF to do data science, machine learning, and artificial intelligence. It includes a platform and a team of scientists working with country offices on projects like:

            <ul>
                <li>models for forecasting an epidemic</li>
                <li>mapping all schools in the world</li>
            </ul>
          Browse <a href='https://www.unicef.org/innovation/Magicbox'>here</a> for more information on Magicbox.
          </h3>

        </div>
      </div>
    </div>
  </div>
};

export default LandingPage;
