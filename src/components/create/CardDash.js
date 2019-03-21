// Main landing page for Card portion of app. Gives user access to create new cards and view their collection

import React, { Component } from 'react'
import { Button, Row, Container } from 'reactstrap'
import { Link } from 'react-router-dom'
import CreateModal from './CreateModal'
import NavBar from '../NavBar'

export default class CardDash extends Component {

  componentDidMount = () => {
    this.props.handleNavText("Cards")
  }

  render() {
    return (
      <Container className="d-flex flex-column">
        <NavBar navText={this.props.navText} />
        <Row className="my-auto d-flex justify-content-center">
          <CreateModal />
          <Button tag={Link} to='/your-cards' className="big-button"><i className="fas fa-images"></i><h3>Your Cards</h3></Button>
        </Row>
      </Container>
    )
  }
}