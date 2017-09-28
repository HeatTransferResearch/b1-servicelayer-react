import { Component } from 'react';

class ModalComponent extends Component {
  constructor(props) {
    super(props);
    this.showModal = () => { this.setState({modalIsOpen: true}); };
    this.closeModal = () => { this.setState({modalIsOpen: false}); };
    this.state = {
      modalIsOpen: false
    };
  }
}
export default ModalComponent;
