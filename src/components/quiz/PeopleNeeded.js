import React from 'react'
import { Button, Container, Row } from 'reactstrap'
import { Link } from 'react-router-dom'

export default class PeopleNeeded extends React.Component {
render () {
  return (
    <Container>
      <Row>
        <h1>You need more cards to take this quiz.</h1>
        <Button tag={Link} to="/create">Create Cards</Button>
        <Button tag={Link} to="/quiz-select">Take Different Quiz</Button>
      </Row>
    </Container>
  )
}
}