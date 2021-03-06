// Affordance for users that try to take a People quiz but have not yet created 10 Cards.

import React from 'react'
import { Button, Container, Row } from 'reactstrap'
import { Link } from 'react-router-dom'

export default class PeopleNeeded extends React.Component {
  render() {
    return (
      <Container>
        <Row>
          <h1>You need more cards to take this quiz.</h1>
          <Row className="d-flex justify-content-around">
            <Button tag={Link} to="/cards"><i className="fas fa-file-medical"></i><h3>Create Cards</h3></Button>
            <Button tag={Link} to="/quiz-select"><i className="fas fa-question-circle"></i><h3>Take Another Quiz</h3></Button>
          </Row>
        </Row>
      </Container>
    )
  }
}