import React, { Component } from 'react'
import API from '../../modules/API/API'
import UserSession from '../../modules/User/UserSession'

export default class Welcome extends Component {
  state = {
    firstName: ""
  }

  getName = () => {
    let userId = UserSession.getUser()
    API.getData(`users?id=${userId}`)
      .then((user) => {
        return this.setState({
          firstName: user[0].firstName,
        })
      })
  }

  componentDidMount() {
    this.getName()
  }

  render() {
    return (
      <div>
        <h1>Welcome, {this.state.firstName}! You Logged In!</h1>
      </div>
    )
  }
}