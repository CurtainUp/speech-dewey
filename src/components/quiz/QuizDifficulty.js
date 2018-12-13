import React, { Component } from 'react'
import { Button, Row, Container } from 'reactstrap'
import QuizSelect from './QuizSelect'

export default class QuizDifficulty extends Component {

  setDifficulty = (e) => {
    let clicked = e.target
      return this.props.onDifficultyChange(clicked.id)
  }

  componentDidMount() {
    return this.props.onDifficultyChange("")
  }

  render() {

    if (this.props.difficulty !== "") {
      return <QuizSelect />
    }
    else {
      return (
        <Container>
        <Row className="d-flex justify-content-center">
          <Button color="success" id="easy" size="xl" onClick={(e) => { this.setDifficulty(e) }}><i className="far fa-star form-icon"></i><h3>Easy</h3></Button>
          <Button color="warning" id="medium" size="xl" onClick={(e) => { this.setDifficulty(e) }}><i className="far fa-star form-icon"></i><i className="far fa-star form-icon"></i><h3>Medium</h3></Button>
        </Row>
        </Container>)
    }
  }
}