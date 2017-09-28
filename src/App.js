import React, { Component } from 'react';

import { Button, ButtonToolbar } from 'react-bootstrap';
import Modal from 'react-modal';
import FieldGroup from './FieldGroup.js';

import ServiceLayerLogin from './ServiceLayerLogin.js';
import ServiceLayer from './ServiceLayer.js';
import Registration from './Registration.js';
import logo from './logo.svg';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.statusChanged = this.statusChanged.bind(this);
  }

  statusChanged(loggedIn) {
    this.setState({loggedIn: loggedIn});
  }

  render() { 
    var loggedIn = this.state.loggedIn;
    var regComponent = loggedIn ? <Registration/> : '';

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to SL-React</h2>
          
        </div>
        <div className="App-intro">
          <ButtonToolbar>
              <ServiceLayerLogin statusChanged={this.statusChanged}/>
          </ButtonToolbar>

          {regComponent}

          </div>
      </div>
    );
  }

  componentDidMount() {
    ServiceLayer.isLoggedIn().then(response => {
      this.setState({loggedIn: response.ok});  
    }).catch(error => {
      this.setState({loggedIn: false});  
    });
  }
}

export default App;

