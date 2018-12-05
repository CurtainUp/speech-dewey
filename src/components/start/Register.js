import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'
import validate from '../../modules/User/Validate'

export default class Register extends Component {
  state = {
    form: false,
    email: "",
    password: "",
    firstName: ""
  }

  show = () => {
    this.setState({
      form: !this.state.form
    })
  }

  RegisterForm = () => {
    return (
      <Form onSubmit={(e) => this.submitRegistration(e)}>
        <FormGroup>
          <Label for="Email"><i className="fa fa-envelope form-icon" aria-hidden="true"></i>Email</Label>
          <Input type="email" name="email" id="email" placeholder="E-mail" required onChange={this.handleFieldChange} />
        </FormGroup>
        <FormGroup>
          <Label for="Password"><i className="fa fa-key form-icon" aria-hidden="true"></i>
            Password</Label>
          <Input type="password" name="password" id="password" placeholder="Password" required onChange={this.handleFieldChange} />
        </FormGroup>
        <FormGroup>
          <Label for="FirstName"><i className="fa fa-user-circle form-icon" aria-hidden="true"></i>First Name</Label>
          <Input type="text" name="firstname" id="firstName" placeholder="First Name" required onChange={this.handleFieldChange} />
        </FormGroup>
        <Button type="submit"><i className="fa fa-arrow-circle-right form-icon" aria-hidden="true"></i></Button>
        <Button onClick={() => this.show()}><i className="fa fa-times-circle form-icon" aria-hidden="true"></i></Button>
      </Form>)
  }

  // Function that updates state to reflect user input
  handleFieldChange = e => {
    const stateToChange = {}
    stateToChange[e.target.id] = e.target.value
    console.log(stateToChange)
    this.setState(stateToChange)
  }

  submitRegistration = (e) => {
    e.preventDefault()
    let obj = {
      email: this.state.email,
      password: this.state.password,
      firstName: this.state.firstName
    }
    //validate, submit, closes form
    validate.newUser(obj)
    .then(() => this.props.history.push("/welcome"))
  }

  render() {
    return (
      <div>
        {/* Register button. Shows form on click */}
        <Button size="xl" onClick={() => this.show()}><i className="fas fa-user-plus"></i></Button>
        {/* Checks state and shows/hides Register Form */}
        {this.state.form && <this.RegisterForm />}
      </div>

    )
  }
}
