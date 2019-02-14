// Logged in user dashboard

import React, { Component } from 'react'
import { Button, Row, Container } from 'reactstrap'
import { Link } from 'react-router-dom'
import API from '../../modules/API/API'
import UserSession from '../../modules/User/UserSession'
import NavBar from '../NavBar'

export default class Welcome extends Component {
  state = {
    firstName: ""
  }

  getName = () => {
    return new Promise((resolve) => {
    let userId = UserSession.getUser()
    API.getData(`users?id=${userId}`)
      .then((user) => {
        return this.setState({
          firstName: user[0].firstName}, () => resolve()) })
      })
  }

  componentDidMount() {
    this.getName()
    .then(() => this.props.handleNavText(`Welcome, ${this.state.firstName}`))
  }

  render() {
    return (
      <Container className="d-flex flex-column">
        <NavBar navText={this.props.navText} />
        <Row className="my-auto d-flex justify-content-around">
          <Button tag={Link} to='/quiz-select'><i className="fas fa-question-circle"></i><h3>Take Quiz</h3></Button>
          <Button tag={Link} to='/stats'><i className="fas fa-chart-pie"></i><h3>Stats</h3></Button>
          <Button tag={Link} to='/cards'><i className="fas fa-edit"></i><h3>Cards</h3></Button>
        </Row>
      </Container>
    )
  }
}