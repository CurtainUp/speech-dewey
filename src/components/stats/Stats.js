import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap';
import API from "../../modules/API/API"
import UserSession from '../../modules/User/UserSession'

export default class Stats extends Component {
  state = {
    dailyCorrect: 0,
    dailyIncorrect: 0,
    dailySkipped: 0,
    overallCorrect: 0,
    overallIncorrect: 0,
    overallSkipped: 0
  }

  getOverallTally = () => {
    let overall = {
      overallCorrect: 0,
      overallIncorrect: 0,
      overallSkipped: 0
    }
    let currentUser = UserSession.getUser()
    return API.getUserScoreData(currentUser)
      .then(score => {
        let allscores = score
        allscores.map(score => {
          if (score.status === "correct") {
            overall.overallCorrect += 1
          } else if (score.status === "incorrect") {
            overall.overallIncorrect += 1
          } else {
            overall.overallSkipped += 1
          } return overall
        })
      })
      // .then(() => { return console.table(overall)})
      .then(() => { return this.setState({overallCorrect: overall.overallCorrect, overallIncorrect: overall.overallIncorrect, overallSkipped: overall.overallSkipped})})
  }

  // Basic function to calculate percent of correct answers
  getPercentageCorrect = (right, total) => {
    let percentCorrect = (right / total) * 100
    percentCorrect = percentCorrect.toString() + "%"
    return percentCorrect
  }

componentDidMount = () => {
  this.getOverallTally()
}

  render() {
    return (
      <Container>
        <Row>
          <h1>Your Stats</h1>
        </Row>
        <Row>
          <Col>
            <h3>Today</h3>
          </Col>
          <Col>
            <h3>Total</h3>
            <h4>Correct: {this.state.overallCorrect}</h4>
            <h4>Incorrect: {this.state.overallIncorrect}</h4>
            <h4>Skipped: {this.state.overallSkipped}</h4>
          </Col>
        </Row>
      </Container>
    )
  }
}