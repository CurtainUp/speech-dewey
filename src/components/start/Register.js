import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'

export default class Register extends Component {
  state = {
    form: false,
    email: "",
    password: ""
  }

  show = () => {
    this.setState({
      form: !this.state.form
    })
  }

  RegisterForm = () => {
    return (
      <Form>
        <FormGroup>
          <Label for="Email"><i className="fa fa-envelope form-icon" aria-hidden="true"></i>Email</Label>
          <Input type="email" name="email" id="Email" placeholder="E-mail" />
        </FormGroup>
        <FormGroup>
          <Label for="Password"><i className="fa fa-key form-icon" aria-hidden="true"></i>
            Password</Label>
          <Input type="password" name="password" id="Password" placeholder="Password" />
        </FormGroup>
        <FormGroup>
          <Label for="FirstName"><i className="fa fa-user-circle form-icon" aria-hidden="true"></i>First Name</Label>
          <Input type="text" name="firstname" id="FirstName" placeholder="First Name" />
        </FormGroup>
        <Button><i className="fa fa-arrow-circle-right form-icon" aria-hidden="true"></i></Button>
        <Button onClick={() => this.show()}><i className="fa fa-times-circle form-icon" aria-hidden="true"></i></Button>
      </Form>)
  }

  render() {
    return (
      <div>
        <Button size="xl" onClick={() => this.show()}><i className="fa fa-user-plus" aria-hidden="true"></i></Button>
        {this.state.form && <this.RegisterForm />}
      </div>

    )
  }
}
