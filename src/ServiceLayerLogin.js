import React, { Component } from 'react';

import { Button } from 'react-bootstrap';
import Modal from 'react-modal';

import ServiceLayer from './ServiceLayer.js';
import FieldGroup from './FieldGroup.js';

class ServiceLayerLogin extends Component {
  constructor(props) {
    super(props);
    this.state = { CompanyDB: 'SBOSL', UserName: '', Password: '',
      loggedIn: false, modalIsOpen: false, operationInProgress: false,
      message: ''
    };
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    var data = { }
    data[event.target.id] = event.target.value;
    this.setState(data, () => { 
      //console.log(this.state)
    });
  }

  login() {
    this.setState({operationInProgress: true, message: ''});
    ServiceLayer.login(this.state).then(json=> {
      this.setState({loggedIn: true, modalIsOpen: false, operationInProgress: false});
      this.props.statusChanged(true);
    })
    .catch(error => {
      var message = error.message ? error.message : error; 
      console.log(message);
      this.setState({message: message, operationInProgress: false});
      this.props.statusChanged(false);
    });
  }
 
  logout() {
    ServiceLayer.logout().then(response => {
      console.log('logged out.');
      this.setState({loggedIn: false, operationInProgress: false});
      this.props.statusChanged(false);
    })
    .catch(error => {
      console.log(error);
      this.setState({loggedIn: false, operationInProgress: false});
      this.props.statusChanged(false);
    });
  }

  showModal() {
    this.setState({modalIsOpen: true, message: ''});
  }

  closeModal() {
    this.setState({modalIsOpen: false, message: ''});
  }

  render() { 
    var loggedIn = this.state.loggedIn;
    var text = loggedIn ? 'Logout' : 'Login';
    var clickEvent = loggedIn ? this.logout : this.showModal;
    var magicButton = <Button bsStyle="info" 
                              onClick={clickEvent}> 
                      {text} 
                      </Button>;
    var loading = this.state.operationInProgress;

    return (
          <div className="left"> 
            {magicButton}
          <Modal onRequestClose={this.closeModal}
                 contentLabel='Login'
                 isOpen={this.state.modalIsOpen}>
                            <FieldGroup
                              id="UserName"
                              type="text"
                              label="User ID"
                              disabled={this.state.loggedIn}
                              placeholder="Enter User ID"
                              onChange={this.handleChange}
                            />
                            <FieldGroup
                              id="Password"
                              type="password"
                              label="Password"
                              disabled={this.state.loggedIn}
                              placeholder="Password"
                              onChange={this.handleChange}
                            />
                    <Button
                      bsStyle="primary"
                      disabled={loading}
                      onClick={loading ? null : this.login}>
                      {loading ? 'Loading...'  : 'Ok'}
                    </Button>&nbsp;
                    <Button
                      onClick={this.closeModal}
                      disabled={loading}
                      bsStyle="info">
                      Cancel
                    </Button>
                  {this.state.message}
                  </Modal>
 </div>
    )
  }

  componentDidMount() {
    ServiceLayer.isLoggedIn().then(response => {
      this.setState({loggedIn: response.ok});  
    }).catch(error => {
      this.setState({loggedIn: false});  
    });
  }
}

export default ServiceLayerLogin;
