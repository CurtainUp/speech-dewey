// Login functionality

import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, Modal, ModalBody, ModalFooter } from 'reactstrap'
import validate from '../../modules/User/Validate'
import UserSession from '../../modules/User/UserSession';

export default class Login extends Component {
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

  LoginForm = () => {
    return (
      <Form onSubmit={(e) => this.submitLogin(e)}>
        <FormGroup>
          <Label for="exampleEmail"><i className="fa fa-envelope form-icon" aria-hidden="true"></i>Email</Label>
          <Input type="email" name="email" id="email" placeholder="E-mail" required onChange={this.handleFieldChange} />
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword"><i className="fa fa-key form-icon" aria-hidden="true"></i>
            Password</Label>
          <Input type="password" name="password" id="password" placeholder="Password" required onChange={this.handleFieldChange} />
        </FormGroup>
        <ModalFooter>
        <Button color="danger" className="modal-button" onClick={() => this.toggle()}><i className="fa fa-times-circle form-icon" aria-hidden="true"></i><h3>Cancel</h3></Button>
        <Button type="submit" color="success" className="modal-button"><i className="fa fa-arrow-circle-right form-icon" aria-hidden="true"></i><h3>Login</h3></Button>
        </ModalFooter>
      </Form>)
  }

  // Function that updates state to reflect user input
  handleFieldChange = e => {
    const stateToChange = {}
    stateToChange[e.target.id] = e.target.value
    this.setState(stateToChange)
  }

  submitLogin = (e) => {
    e.preventDefault()
    let obj = {
      email: this.state.email,
      password: this.state.password
    }
    //validate and submit, update top level userId state
    validate.existingUser(obj)
    .then(() => this.props.handleLoginChange(UserSession.getUser()))
      .then(() => this.props.history.push("/welcome"))
  }

  render() {
    return (
      <div>
        <Button className="mr-3 big-button" size="xl" onClick={() => this.toggle()}><i className="fas fa-user"></i><h3>Login</h3></Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalBody>
            <this.LoginForm />
          </ModalBody>
        </Modal>
      </div>
    )

  }
}
