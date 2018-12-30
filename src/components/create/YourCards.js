import React, { Component } from 'react'
import { Container, Row, Col, ListGroup, ListGroupItem } from 'reactstrap'
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
      .then(() => console.log(userCards))
      .then(() => this.setState({ userCards: userCards }))
  }

  componentDidMount() {
    this.props.handleNavText("Your Cards")
      .then(() => this.loadCards())
  }

  render() {
    return (
      <Container>
        <NavBar navText={this.props.navText} />
        <Row className="d-flex inline justify-content-center">
          <CreateModal />
        </Row>
        <Col className="d-flex inline justify-content-center">
          <ListGroup>
            {
              this.state.userCards.map((card) =>
                <ListGroupItem className="card-view" key={card.id} id={card.id}>
                  <Row className="d-flex inline">
                    <Col md="d-flex m-3">
                      <h3>{card.word}</h3>
                      <h3>{card.relationship}</h3>
                    </Col>
                    <Col lg="d-flex m-3">
                      <img className="rounded card-img" alt={card.word} src={card.image}></img>
                    </Col>
                  </Row>
                  <Row className="d-flex inline justify-content-center">
                    <EditModal card={card} loadCards={this.loadCards} />
                    <DeleteModal cardId={card.id} loadCards={this.loadCards} />
                  </Row>
                </ListGroupItem>
              )
            }
          </ListGroup>
        </Col>
      </Container>
    )
  }
}