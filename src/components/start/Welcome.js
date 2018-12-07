import React, { Component } from 'react'
import { Button } from 'reactstrap'
import { Link } from 'react-router-dom'
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
        <div>
          <h1>Welcome, {this.state.firstName}! You Logged In!</h1>
        </div>
        <div>
          <Button tag={Link} to='/quiz-select'><i className="fas fa-question-circle"></i><h3>Take Quiz</h3></Button>
          <Button tag={Link} to='/stats'><i className="fas fa-chart-pie"></i><h3>Stats</h3></Button>
          <Button tag={Link} to='/cards'><i className="fas fa-edit"></i><h3>Cards</h3></Button>
        </div>
      </div>
    )
  }
}