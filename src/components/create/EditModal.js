import React from 'react'
import { Button, Modal, ModalHeader, ModalFooter, FormGroup, Label, Input, ModalBody } from 'reactstrap'
import API from '../../modules/API/API'
import UserSession from '../../modules/User/UserSession'

class EditModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false
    }

    this.toggle = this.toggle.bind(this)
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    })
  }

  // OnClick functionality to edit saved cards
  handleEdit = (id) => {
    // ADD TIMESTAMP
    // let timeSaved = moment(new Date())
    let userId = UserSession.getUser()
    let cardInfo = {
      word: this.state.word,
      relationship: this.state.relationship,
      image: this.state.image,
      userId: userId,
      timestamp: null,
      audioUrl: null
    }
    // Updates database
    return API.editData("cards", cardInfo, id)
    // Renders /your-cards upon successful update
    .then(this.props.loadCards())
  }

  // Captures input fields and updates state
  handleFieldChange = evt => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  render() {
    return (
      <div>
        <Button onClick={this.toggle}>
         <i className="fas fa-edit form-icon"></i><h3>Edit</h3>
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
        {/* Save button click behavior */}
          <form onSubmit={(e) => {
            e.preventDefault()
            this.handleEdit(this.props.card.id)
            this.toggle()
          }}>
            <ModalHeader toggle={this.toggle}><i className="fas fa-edit form-icon"></i></ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label for="word">Word</Label>
                <Input onChange={this.handleFieldChange} type="text" name="word" id="word" defaultValue={this.props.card.word} required />
              </FormGroup>
              <FormGroup>
                <Label for="relationship">Relationship</Label>
                <Input onChange={this.handleFieldChange} type="text" name="relationship" id="relationship" defaultValue={this.props.card.relationship} />
              </FormGroup>
              <FormGroup>
                <Label for="image">Image</Label>
                <Input onChange={this.handleFieldChange} type="text" name="image" id="image" defaultValue={this.props.card.image} />
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              {/* Save */}
              <Button color="success" className="modal-button" onSubmit={() => {
              }}><i className="fas fa-check form-icon"></i><h3>Save</h3></Button>{' '}
              {/* Cancel  */}
              <Button color="danger" className="modal-button" onClick={this.toggle}><i className="fas fa-ban form-icon"></i><h3>Cancel</h3></Button>
            </ModalFooter>
          </form>
        </Modal>
      </div>
    )
  }
}

export default EditModal