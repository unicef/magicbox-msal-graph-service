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
        <h1> Magicbox, the UNICEF Innovation Big Data platform, is the work of data scientists, software engineers, designers, and researchers
        in NYHQ and Programme Offices, along with academic and private partnerships.</h1>
        </div>
      </div>
      <div className="App-container-div-2">
        <div className="App-sub-container">
        <h4>Magicbox maps</h4>
          <p className="align-left">Use our mapping tool to generate insights for allocating resources, infrastructure planning, and emergency preparedness and response.</p>
        </div>
      </div>
      <div className="App-container-div-2">
        <div className="App-sub-container">
        <h4>Why Big Data?</h4>
        <p>Data captures many different parts of human behavior, mobility, and environmental patterns. We can use data to shape responses to disasters, epidemics, and other challenges, by telling those involved in the response:</p>
          <ul>
                <li>Where to focus their limited resources;</li>
                <li>How people who are most at risk are thinking about a threat;</li>
                <li>What information to provide to affected populations;</li>
                <li>and ways to proactively inform vital work to protect vulnerable children.</li>
          </ul>
        <p>It also allows us to link this information to governments and other partners for real-time situational awareness and problem-solving.</p>
        </div>
      </div>
    </div>
  </div>
};

export default LandingPage;
