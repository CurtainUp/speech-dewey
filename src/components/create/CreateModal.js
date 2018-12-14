import React, { Component } from 'react'
import { Col, Button, Form, FormGroup, Label, Input, Modal, ModalFooter, ModalBody } from 'reactstrap'
import API from '../../modules/API/API'
import UserSession from '../../modules/User/UserSession'

export default class CreateModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false,
      word: "",
      relationship: "",
      image: ""
    }

    this.toggle = this.toggle.bind(this)
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    })
  }

  handleFieldChange = e => {
    const stateToChange = {}
    stateToChange[e.target.id] = e.target.value
    console.log(stateToChange)
    this.setState(stateToChange)
  }

  cardObject = () => {
    let newCard = {
      userId: UserSession.getUser(),
      categoryId: 4,
      word: this.state.word,
      image: this.state.image,
      relationship: this.state.relationship,
      audioUrl: ""
    }
    return newCard
  }

  saveCard = (e) => {
    e.preventDefault()
    let newCard = this.cardObject()
    API.saveData("cards", newCard)
  }

  render() {
    return (
      <div>
        <Button className="mr-3" onClick={this.toggle}><i className="fas fa-file-medical"></i><h3>Create</h3></Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
            <Form onSubmit={(e) => {
              e.preventDefault()
              this.saveCard(e)
              this.toggle()
            }}>
          <ModalBody>
              <FormGroup row>
                <Label for="Word" sm={2}>Word or Name</Label>
                <Col sm={10}>
                  <Input type="text" name="word" id="word" required onChange={this.handleFieldChange} />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="Relationship" sm={2}>Relationship</Label>
                <Col sm={10}>
                  <Input type="text" name="relationship" id="relationship" onChange={this.handleFieldChange} />
                </Col>
              </FormGroup>
              <FormGroup>
                <Label for="Image">Image Url</Label>
                <Input type="url" name="image" id="image" onChange={this.handleFieldChange} />
              </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="success" className="modal-button" type="submit" onClick={()=> {}}><i className="fas fa-arrow-circle-right form-icon"></i><h3>Save</h3></Button>
            <Button color="danger" className="modal-button" onClick={this.toggle}><i className="fas fa-ban form-icon"></i><h3>Cancel</h3></Button>
          </ModalFooter>
            </Form>
        </Modal>
      </div>
    )
  }
}