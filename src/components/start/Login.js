import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'
import validate from '../../modules/User/Validate'

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
      <Form onSubmit={(e) => this.submitLogin(e)}>
        <FormGroup>
          <Label for="exampleEmail"><i className="fa fa-envelope form-icon" aria-hidden="true"></i>Email</Label>
          <Input type="email" name="email" id="email" placeholder="E-mail" required onChange={this.handleFieldChange}/>
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword"><i className="fa fa-key form-icon" aria-hidden="true"></i>
            Password</Label>
          <Input type="password" name="password" id="password" placeholder="Password" required onChange={this.handleFieldChange}/>
        </FormGroup>
        <Button type="submit"><i className="fa fa-arrow-circle-right form-icon" aria-hidden="true"></i></Button>
        <Button onClick={() => this.show()}><i className="fa fa-times-circle form-icon" aria-hidden="true"></i></Button>
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
    console.log(obj)
    //validate and submit
    validate.existingUser(obj)
    console.log("Login Successful")
    this.show()
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
