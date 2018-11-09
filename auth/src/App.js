import React, { Component } from 'react';
import logo from './logo.svg';
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
      loginFailed: false,
      value: ''
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
    );
  };

  handleChange = (event) => {
    this.setState({value: event.target.value});
  }

  handleSubmit= (event) =>  {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    let templates = [];
    if (this.state.user) {
      templates.push(
        <div key="loggedIn">
          <button onClick={this.callAPI} type="button">
            Visit Magic Box Maps
          </button>
          <button onClick={this.logout} className="App-nav">
            Logout
          </button>
          <h3>Hello {this.state.user.name}</h3>
        </div>
      );
    } else {
      templates.push(
          <a className="nav" onClick={this.login} key="loggedIn">
            UNICEF Login
          </a>
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

      templates.push(
        <App1 user={this.state.user}/>
      );
    }
    if (this.state.loginFailed) {
      templates.push(<strong key="loginFailed">Login unsuccessful</strong>);
    }
    if (this.state.apiCallFailed) {
      templates.push(
        <strong key="apiCallFailed">Graph API call unsuccessful</strong>
      );
    }
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Magic Box Maps</h1>
        </header>
          <ul className="App-nav">
            <li className="nav">{templates}</li>
            <li className="nav"><a className="nav" href="#">For Developers</a></li>
            <li className="nav"><a className="nav" href="#">Contact Us</a></li>
          </ul>
        <div className="App-container">
        <h4>What is Magic Box?</h4>
        <p>Magic Box is a platform for Big Data at UNICEF Innovation and is the work of data scientists, software engineers, designers, and researchers in NYHQ and Programme Offices, along with academic and private partnerships.</p>
        <h4>The Magic Box Toolkit</h4>
        <p>Currently, users can create and share maps that provide insights for allocating resources, infrastructure planning, and emergency preparedness and response. <a onClick={this.login} key="loggedIn" className="in-text">Log in</a> with your UNICEF credentials to access the Magic Box Maps map creation interface.</p>
        <h4>Why Big Data?</h4>
        <p>Data captures many different parts of human behavior, mobility, and environmental patterns. We can use data to shape responses to disasters, epidemics, and other challenges, by telling those involved in the response:</p>
          <ul>
                <li>Where to focus their limited resources;</li>
                <li>How people who are most at risk are thinking about a threat;</li>
                <li>What information to provide to affected populations;</li>
                <li>and ways to proactively inform vital work to protect vulnerable children.</li>
          </ul>
        <p>It also allows us to link this information to governments and other partners for real-time situational awareness and problem-solving.</p>
          <form onSubmit={this.handleSubmit} className="contact-form">
            <h4>Want to learn more about our project or working with us? Get in touch.</h4>
            <input type="text" value={this.state.value} onChange={this.handleChange}  placeholder="Email Address" className="contact-form-input" required/>
            <input type="submit" value="I'm interested" className="button"/>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
