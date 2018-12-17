import React, { Component } from 'react';
import './App.css';

import AuthService from './services/auth.service';
import GraphService from './services/graph.service';
import App1 from './components/magicbox-kepler-demo/client/src/app';
import InvalidLogin from './components/templates/invalid-login';
import ValidLogin from './components/templates/valid-login';
import LandingPage from './components/templates/landing-page';
import { LoadingSpinner } from 'kepler.gl/components';


require('dotenv').config()
class App extends Component {
  constructor() {
    super();
    this.authService = new AuthService();
    this.graphService = new GraphService();
    this.state = {
      user: null,
      loginFailed: false,
      validToken: false
    };
  }

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

  validateToken = (token) => {
    let currentToken = this.state.user.tokenStr;
    const url = 'http://localhost:5000/api/maps/verify';
      fetch(url, {
        method: 'GET',
        headers: {
          'x-access-token' : `Bearer ${currentToken}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(response => (response.json()))
        .then(response => response.authorized ? this.setState({validToken: true}) : this.setState({loginFailed: true}))
    };

  render() {
    let templates = [];
    if (!!this.state.user) {
      this.validateToken()
      if (!!this.state.validToken) {
        templates.push(
          <div>
            <ValidLogin name="valid-login" logout={this.logout} />
            <App1 user={this.state.user}/>
          </div>
        );
      }
  } else if (!!this.state.loginFailed) {
      templates.push(
        <InvalidLogin name="invalid-login" login={this.login} redirectHome={this.redirectHome} />
      );
  } else {
      templates.push(
        <LandingPage name="landing-page" login={this.login}/>
      )
    }
    return (
      <div className="App">
        {templates}
      </div>
    );
  }
}

export default App;
