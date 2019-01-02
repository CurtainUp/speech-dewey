// Allows the user to choose the category for their quiz and alters state accordingly.

import React, { Component } from 'react'
import { Button, Container, Row } from 'reactstrap'
import { Link } from 'react-router-dom'

export default class QuizSelect extends Component {
  state = {
    clicked: false,
  }

  show = () => {
    this.setState({
      clicked: !this.state.clicked
    })
  }

  render() {

    return (
      <Container>
        <Row>
        <div className="d-flex justify-content-around">
          <Button tag={Link} to='/food-quiz'><i className="fas fa-utensils"></i><h3>Food & Drink</h3></Button>
          <Button tag={Link} to='/mood-quiz'><i className="fas fa-medkit"></i><h3>Mood & Health</h3></Button>
          <Button tag={Link} to='/home-quiz'><i className="fas fa-home"></i><h3>Home & Clothes</h3></Button>
          <Button tag={Link} to='/people-quiz'><i className="fas fa-users"></i><h3>Friends & Family</h3></Button>
          </div>
        </Row>
      </Container>
    )
  }
}