import React, { Component } from 'react'
import { Button, Row } from 'reactstrap'
import { Link } from 'react-router-dom'
import QuizSelect from './QuizSelect'

export default class QuizDifficulty extends Component {

  setDifficulty = (e) => {
    let clicked = e.target
      return this.props.onDifficultyChange(clicked.id)
  }

  render() {

    if (this.props.difficulty !== "") {
      return <QuizSelect />
    }
    else {
      return (
        <Row>
          <Button color="success" id="easy" onClick={(e) => { this.setDifficulty(e) }}><i className="far fa-star form-icon"></i><h3>Easy</h3></Button>
          <Button color="warning" id="medium" onClick={(e) => { this.setDifficulty(e) }}><i className="far fa-star form-icon"></i><i className="far fa-star form-icon"></i><h3>Medium</h3></Button>
        </Row>)
    }
  }
}