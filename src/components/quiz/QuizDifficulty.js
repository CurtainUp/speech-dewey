import React, { Component } from 'react'
import { Button, Row, Container } from 'reactstrap'
import QuizSelect from './QuizSelect'
import NavBar from '../NavBar'

export default class QuizDifficulty extends Component {

  setDifficulty = (e) => {
    let clicked = e.target
    return this.props.onDifficultyChange(clicked.id)
  }

  componentDidMount() {
    this.props.handleNavText("Quiz")
    .then(() => { return this.props.onDifficultyChange("")})
  }

  render() {

    if (this.props.difficulty !== "") {
      return (
        <Container>
        <NavBar navText={this.props.navText} />
        <QuizSelect />
        </Container>)
    }
    else {
      return (
        <Container>
          <NavBar navText={this.props.navText} />
          <Row className="d-flex justify-content-center">
            <Button className="mr-3" color="success" id="easy" size="xl" onClick={(e) => { this.setDifficulty(e) }}><i className="far fa-star form-icon" id="easy" onClick={(e) => { this.setDifficulty(e) }}></i><h3>Easy</h3></Button>
            <Button color="warning" id="medium" size="xl" onClick={(e) => { this.setDifficulty(e) }}><i className="far fa-star form-icon" id="easy" onClick={(e) => { this.setDifficulty(e) }}></i><i className="far fa-star form-icon"></i><h3>Medium</h3></Button>
          </Row>
        </Container>)
    }
  }
}