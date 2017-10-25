import React, { Component } from 'react';

import { Button } from 'react-bootstrap';

import FieldGroup from './FieldGroup.js';
import BusinessPartnerService from './BusinessPartnerService.js';


class BusinessPartnerForm extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.doCreate = this.doCreate.bind(this);
    this.doSave = this.doSave.bind(this);
    this.doDelete = this.doDelete.bind(this);

    console.log('got this in bpform ctor: ', this.props);
    this.state = {
      message: '',
      bp: {
      CardCode: this.props.theBp.CardCode,
      CardName: this.props.theBp.CardName,
      EmailAddress: this.props.theBp.EmailAddress,
      Notes: this.props.theBp.Notes,
      }
    };
    console.log('bpform incoming data: ', this.state);
  }

  handleChange(event) {
    var data = this.state.bp;
    console.log('doing something.');
    data[event.target.id] = event.target.value;
    this.setState({bp: data}, () => { 
      console.log(this.state)
    });
  }

  doCreate(e) {
    BusinessPartnerService.create(this.state.bp).then(json => {
      //console.log(json);
      this.props.operationCompleted(this.state.bp);
    }).catch(error => {
      this.setState({message: error, bp: this.state.bp}); 
    });
  }

  doSave(e) {
    BusinessPartnerService.update(this.state.bp).then(json => {
      //console.log(json);
      this.props.operationCompleted(this.state.bp);
    }).catch(error => {
      this.setState({message: error, bp: this.state.bp}); 
    });
  }

  doDelete(e) {
    BusinessPartnerService.del(this.state.bp).then(json => {
      //console.log(json);
      this.props.operationCompleted(this.state.bp);
    }).catch(error => {
      this.setState({message: error, bp: this.state.bp}); 
    });
  }


  render() {
    var bp = this.state.bp;
    //console.log('rendering bp form.', bp); 
    
    return (<div>
              <FieldGroup id="CardCode" type="text" label="CardCode"
                          placeholder="CardCode" value={bp.CardCode} 
                          disabled={!this.props.new} onChange={this.handleChange} />
              <FieldGroup id="CardName" type="text" label="CardName"
                          placeholder="CardName" value={bp.CardName} onChange={this.handleChange} />
              <FieldGroup id="EmailAddress" type="text" label="EmailAddress"
                          placeholder="EmailAddress" value={bp.EmailAddress} onChange={this.handleChange} />
              <FieldGroup id="Notes" type="text" label="Notes"
                          placeholder="Notes" value={bp.Notes} onChange={this.handleChange} />
              <Button bsStyle="primary"
                      onClick={this.props.new ? this.doCreate : this.doSave}>
                      Save
              </Button>
              <Button bsStyle="info" onClick={this.props.close}>
                      Cancel
              </Button>
              {this.state.message}
            </div>
    );
  }
}
export default BusinessPartnerForm;
