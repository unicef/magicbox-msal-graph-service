import React, { Component } from 'react';
import './App.css';

import AuthService from './services/auth.service';
import GraphService from './services/graph.service';
import App1 from './components/magicbox-kepler-demo/client/src/app'

require('dotenv').config()
class App extends Component {
  constructor() {
    super();
    this.authService = new AuthService();
    this.graphService = new GraphService();
    this.state = {
      user: null,
      userInfo: null,
      apiCallFailed: false,
      loginFailed: false
    };
  }
  componentWillMount() {}

  callAPI = () => {
    this.setState({
      apiCallFailed: false
    });
    this.authService.getToken().then(
      token => {
        this.graphService.getUserInfo(token).then(
          data => {
            this.setState({
              userInfo: data
            });
          },
          error => {
            console.error(error);
            this.setState({
              apiCallFailed: true
            });
          }
        );
      },
      error => {
        console.error(error);
        this.setState({
          apiCallFailed: true
        });
      }
    );
  };

  logout = () => {
    this.authService.logout();
  };

  login = () => {
    this.setState({
      loginFailed: false
    });
    this.authService.login().then(
      user => {
        if (user) {
          this.setState({
            user: user
          });
        this.callAPI()
        } else {
          this.setState({
            loginFailed: true
          });
        }
      },
      () => {
        this.setState({
          loginFailed: true
        });
      }
    )
  };

  render() {
    let templates = [];
    if (this.state.user) {
      templates.push(
        <div key="loggedIn">
        <div className="header">
          <a href="#default" className="logo"><img src={require('./logo_primary_white.png')} /></a>
          <a href="#default" className="logo">Magicbox Maps</a>
          <div className="header-right">
            <a className="nav" onClick={this.logout}>Log Out</a>
          </div>
        </div>
        </div>
      );
    } else {
      templates.push(
        <div>
          <div key="loggedIn">
          <div className="header">
            <a href="#default" className="logo"><img src={require('./logo_primary_white.png')} /></a>
            <a href="#default" className="logo">Magicbox Maps</a>
            <div className="header-right">
              <a className="nav" onClick={this.login}>Log In</a>
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
      );
    }
    if (this.state.userInfo) {
        // <pre key="userInfo">{JSON.stringify(this.state.userInfo, null, 4)}</pre>
      let user_profile = this.state.userInfo
      let profile = Object.keys(user_profile).reduce((s, k) => {
        console.log(k)
        if (!k.match(/\@/)) {
          s +=  k + '=' + user_profile[k] + '&'
        }

        return s
      }, '?')
      console.log(this.state)
      console.log('___')
      templates.push(
        <App1 idToken={this.state.user.idToken}/>
      );
    }
    return (
      <div className="App">
        {templates}
      </div>
    );
  }
}

export default App;
