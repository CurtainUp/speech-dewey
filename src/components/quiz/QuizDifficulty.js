// Allows the user to choose the level of difficulty for their quiz and alters state accordingly.

import React, { Component } from 'react'
import { Button, Row, Container } from 'reactstrap'
import QuizSelect from './QuizSelect'
import NavBar from '../NavBar'

export default class QuizDifficulty extends Component {

  setDifficulty = (e) => {
    let clicked = e.currentTarget
    return this.props.onDifficultyChange(clicked.id)
  }

  componentDidMount() {
    this.props.handleNavText("Quiz")
      .then(() => { return this.props.onDifficultyChange("") })
  }

  render() {

    if (this.props.difficulty !== "") {
      return (
        <Container className="d-flex flex-column">
          <NavBar navText={this.props.navText} />
          <QuizSelect />
        </Container>)
    }
    else {
      return (
        <Container className="d-flex flex-column">
          <NavBar navText={this.props.navText} />
          <Row className="my-auto d-flex justify-content-center">
            <Button className="mr-3" style={{width: "240px"}} color="success" id="easy" size="xl" onClick={(e) => { this.setDifficulty(e) }}>
                <i className="far fa-star form-icon"></i>
                <h3>Easy</h3>
            </Button>
            <Button color="warning" id="medium" size="xl" onClick={(e) => { this.setDifficulty(e) }}>
                <i className="far fa-star form-icon"></i><i className="far fa-star form-icon"></i>
                <h3>Medium</h3>
            </Button>
          </Row>
        </Container>)
    }
  }
}