import React from 'react';
import { Button, Modal, ModalHeader, ModalFooter } from 'reactstrap';
import API from '../../modules/API/API'

class DeleteModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  // OnClick functionality to delete saved cards
  handleDelete = (id) => {
    API.deleteData("cards", id)
      // .then(() => this.props.loadCards())
      .then(this.toggle())
  }

  render() {
    return (
      <div>
        <Button className="card-button" onClick={this.toggle}><i className="fas fa-trash-alt form-icon"></i><h3>Delete</h3></Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}><i className="fas fa-trash-alt form-icon"></i><h2>Delete this card?</h2></ModalHeader>
          <ModalFooter>
            <Button color="success" className="modal-button" onClick={() => { this.handleDelete(this.props.cardId) }}><i className="fas fa-check form-icon"></i><h3>Delete</h3></Button>{' '}
            <Button color="danger" className="modal-button" onClick={this.toggle}><i className="fas fa-ban form-icon"></i><h3>Cancel</h3></Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default DeleteModal;