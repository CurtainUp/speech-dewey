import React, { Component } from 'react'
import { Button, Row, Container } from 'reactstrap'
import { Link } from 'react-router-dom'

export default class CardDash extends Component {

  render() {
    return (
      <Container>
        <Row>
          <h1>Cards</h1>
        </Row>
        <Row className="d-flex justify-content-center">
          <Button tag={Link} to='/create'><i className="fas fa-file-medical"></i><h3>Create</h3></Button>
          <Button tag={Link} to='/your-cards'><i className="fas fa-images"></i><h3>Your Cards</h3></Button>
        </Row>
      </Container>
    )
  }
}