// Lists Cards that the current user has created.

import React, { Component } from 'react'
import { Container, Row, Col, CardDeck, Card, CardImg, CardBody, CardText, ListGroup, ListGroupItem } from 'reactstrap'
import API from '../../modules/API/API'
import UserSession from '../../modules/User/UserSession'
import DeleteModal from './DeleteModal'
import EditModal from './EditModal'
import CreateModal from './CreateModal'
import NavBar from '../NavBar'

export default class YourCards extends Component {
  state = {
    userCards: [],
  }

  loadCards = () => {
    let currentUser = UserSession.getUser()
    let userCards = {}
    return API.getUserCards(currentUser)
      .then((cards) => userCards = cards)
      .then(() => this.setState({ userCards: userCards }))
  }

  componentDidMount() {
    this.props.handleNavText("Your Cards")
      .then(() => this.loadCards())
  }

  render() {
    return (
      <Container className="d-flex flex-column">
        <NavBar navText={this.props.navText} />
        <Row className="my-auto d-flex justify-content-center">
          <CreateModal loadCards={this.loadCards} />
        </Row>
          <br />
        <CardDeck className="card-deck">
          {
            this.state.userCards.map((card) =>
              <Col sm="3">
                <Card className="rounded card-view" key={card.id} id={card.id}>
                  <CardImg className="rounded img-fluid card-img" alt={card.word} src={card.image}></CardImg>
                  <CardBody>
                    <h5>{card.word}</h5>
                    <h6>{card.relationship}</h6>
                    <Row className="d-flex inline justify-content-around">
                      <EditModal card={card} loadCards={this.loadCards} />
                      <DeleteModal cardId={card.id} loadCards={this.loadCards} />
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            )
          }
        </CardDeck>
        {/* </Col> */}

      </Container>
    )
  }
}