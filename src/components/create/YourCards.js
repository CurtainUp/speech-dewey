import React, { Component } from 'react'
import { Button, Container, Row, Col, ListGroup, ListGroupItem } from 'reactstrap'
import API from '../../modules/API/API'
import UserSession from '../../modules/User/UserSession'

export default class YourCards extends Component {
  state = {
    userCards: [],
  }

loadCards = () => {
 let currentUser = UserSession.getUser()
 console.log(currentUser)
 let userCards = {}
 return API.getUserCards(currentUser)
   .then((cards) => userCards = cards)
   .then(() => console.log(userCards))
   .then(() => this.setState({userCards: userCards}))
}

componentDidMount() {
  this.loadCards()
}

render() {
  return (
    <Container>
      <Row>
        <h1>Your Cards</h1>
      </Row>
      <ListGroup className="d-flex inline">
        {
          this.state.userCards.map((card) =>
            <ListGroupItem  className="card-view" key={card.id}>
              <Row className="d-flex inline">
                <Col md="d-flex m-3">
                  <h3>{card.word}</h3>
                  <h3>{card.relationship}</h3>
                  </Col>
                  <Col lg="d-flex m-3">
                  <img className="rounded card-img" alt={card.word} src={card.image}></img>
                  </Col>
              </Row>
              <Row>
                <Button><i className="fas fa-edit form-icon"></i><h3>Edit</h3></Button>
                <Button><i className="fas fa-trash-alt form-icon"></i><h3>Delete</h3></Button>
              </Row>
            </ListGroupItem>
          )
        }
      </ListGroup>
    </Container>
  )
}
}