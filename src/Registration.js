import React from 'react';
import ModalComponent from './ModalComponent.js';
import { Button, Table} from 'react-bootstrap';
import Modal from 'react-modal';

import BusinessPartner from './BusinessPartner.js';
import BusinessPartnerForm from './BusinessPartnerForm.js';
import BusinessPartnerService from './BusinessPartnerService.js';


function Head() {
        return (<thead><tr>
                       <th>Edit</th>
                       <th>Card Code</th>
                       <th>Name</th>
                       <th>Notes</th>
                       <th>Email Address</th>
                </tr></thead>);
}

class Registration extends ModalComponent {
  constructor(props) {
    super(props);
    this.doCloseModal = this.doCloseModal.bind(this);
    this.getData = this.getData.bind(this);
    this.state = {items: []};
  }
 
  doCloseModal(bp) {
    this.getData();
    this.closeModal();
  }


  render() {
    var items = this.state.items;
    return ( <div>  
               <Table striped bordered condensed hover>
                 <Head/>
                 <tbody>
                 { items.map((item) => {
                         return <BusinessPartner key={item.CardCode} bp={item} delete={this.doDelete}/>;

                       })
                 }
                 </tbody>
               </Table>
               <Button bsStyle="info" onClick={this.showModal}>Create New</Button>
               <Modal onRequestClose={this.closeModal}
                      contentLabel='Business Partner'
                      isOpen={this.state.modalIsOpen}>
                 <BusinessPartnerForm theBp={{}} operationCompleted={this.doCloseModal} close={this.closeModal} new={true}/>
               </Modal>
              </div> );
  }

  getData() {
    BusinessPartnerService.getAll().then(json =>  {
      var newState = {items: json.value, reloaded: 'yes'};
      this.setState(newState, () => { console.log('set: ', this.state)} ); 
    }).catch(function (error, z) {
      console.log('fetch() bps failed: ' + error);        
    });
  }

  componentDidMount() {
    this.getData();
  }
}

export default Registration;
