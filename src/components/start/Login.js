import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'

export default class Login extends Component {
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

  LoginForm = () => {
    return (
      <Form>
        <FormGroup>
          <Label for="exampleEmail"><i className="fa fa-envelope form-icon" aria-hidden="true"></i>Email</Label>
          <Input type="email" name="email" id="Email" placeholder="E-mail" />
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword"><i className="fa fa-key form-icon" aria-hidden="true"></i>
            Password</Label>
          <Input type="password" name="password" id="Password" placeholder="Password" />
        </FormGroup>
        <Button><i className="fa fa-arrow-circle-right form-icon" aria-hidden="true"></i></Button>
        <Button onClick={() => this.show()}><i className="fa fa-times-circle form-icon" aria-hidden="true"></i></Button>
      </Form>)
  }

  render() {
    return (
      <div>
        <Button className="mr-1" size="xl" onClick={() => this.show()}><i className="fa fa-user xl" aria-hidden="true"></i></Button>
        {this.state.form && <this.LoginForm />}
      </div>
    )

  }
}
