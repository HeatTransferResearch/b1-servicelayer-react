import React from 'react';
import { Button } from 'react-bootstrap';
import Modal from 'react-modal';

import ModalComponent from './ModalComponent';
import BusinessPartnerForm from './BusinessPartnerForm';

class BusinessPartner extends ModalComponent {
  constructor(props) {
    super(props);
    this.doCloseModal = this.doCloseModal.bind(this); 
    this.state = {
      modalIsOpen: false,
      bp: this.props.bp
    };
  }
 
  doCloseModal(bp) {
    this.setState({bp: bp});
    this.closeModal();
  }

 
 
  render() {
    var bp = this.state.bp;
    return (<tr key={bp.CardCode}>
              <td>
                <Button bsStyle="warning" onClick={this.showModal}/>
                <Button bsStyle="danger" onClick={this.props.doDelete}/>
                <Modal onRequestClose={this.closeModal}
                       contentLabel='Business Partner'
                       isOpen={this.state.modalIsOpen}>
                  <BusinessPartnerForm theBp={bp} operationCompleted={this.doCloseModal} close={this.closeModal}/>
                </Modal>
              </td>
              <td>{bp.CardCode}</td>
              <td>{bp.CardName}</td>
              <td>{bp.Notes}</td>
              <td><a href={"mailto:" + bp.EmailAddress}>{bp.EmailAddress}</a></td>
            </tr>
    );
  }

  componentDidMount() {
    console.log('bp did mount', this.props);
  }
}

export default BusinessPartner;
