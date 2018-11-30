import React, { Component } from 'react';
import './App.css';

import AuthService from './services/auth.service';
import GraphService from './services/graph.service';
import App1 from './components/magicbox-kepler-demo/client/src/app';
import config from './config';
import InvalidLogin from './components/templates/invalid-login';
import ValidLogin from './components/templates/valid-login';
import LandingPage from './components/templates/landing-page';

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
        if (user && config.whiteListedDomains[user.idToken.email.split('@')[1]]) {
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

  redirectHome = () => {
    console.log("setting state")
    this.setState({
      loginFailed: false
    });
  }

  render() {
    let templates = [];
    if (this.state.user && config.whiteListedDomains[this.state.user.idToken.email.split('@')[1]]) {
      templates.push(
        <ValidLogin logout={this.logout} />
      );
    } else if (this.state.loginFailed === true) {
      templates.push(
      <InvalidLogin login={this.login} redirectHome={this.redirectHome} />
    );
    } else {
      templates.push(
      <LandingPage key={'id'} login={this.login}/>
      );
    }
    if (this.state.userInfo) {
      templates.push(
        <App1 user={this.state.user}/>
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
