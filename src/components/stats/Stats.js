import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap';
import API from "../../modules/API/API"
import UserSession from '../../modules/User/UserSession'
import moment from 'moment'

export default class Stats extends Component {
  state = {
    dailyCorrect: 0,
    dailyIncorrect: 0,
    dailySkipped: 0,
    overallCorrect: 0,
    overallIncorrect: 0,
    overallSkipped: 0
  }

  getDailyTally = () => {
    let today = moment()
    console.log(today.format('L'))
    let daily = {
      dailyCorrect: 0,
      dailyIncorrect: 0,
      dailySkipped: 0
    }
    let currentUser = UserSession.getUser()
    return API.getUserScoreData(currentUser)
      .then(score => {
        let allscores = score
        allscores.map(score => {
          if (moment(score.timestamp).format('L') === today.format('L')) {
            if (score.status === "correct") {
              daily.dailyCorrect += 1
            } else if (score.status === "incorrect") {
              daily.dailyIncorrect += 1
            } else {
              daily.dailySkipped += 1
            }
          } return console.log(moment(score.timestamp).format('L'))
        })
      })
      // .then(() => { return console.table(daily)})
      .then(() => { return this.setState({ dailyCorrect: daily.dailyCorrect, dailyIncorrect: daily.dailyIncorrect, dailySkipped: daily.dailySkipped }) })

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
      .then(() => { return this.setState({ overallCorrect: overall.overallCorrect, overallIncorrect: overall.overallIncorrect, overallSkipped: overall.overallSkipped }) })
  }

  // Calculates total cards answered today
  getDailyAnswered = () => {
    let total = this.state.dailyCorrect + this.state.dailyIncorrect + this.state.dailySkipped
    return total
  }

  // Calculates total cards answered
  getTotalAnswered = () => {
    let total = this.state.overallCorrect + this.state.overallIncorrect + this.state.overallSkipped
    return total
  }

  // Basic function to calculate percent of correct answers
  getPercentageCorrect = (right, total) => {
    let percentCorrect = (right / total) * 100
    console.log("percent", percentCorrect)
    console.log(Math.round(percentCorrect))
    percentCorrect = percentCorrect.toString() + "%"
    return percentCorrect
  }

  componentDidMount = () => {
    this.getOverallTally()
    this.getDailyTally()
  }

  render() {
    let totalPercentCorrect = this.getPercentageCorrect(this.state.overallCorrect, this.getTotalAnswered())
    let dailyPercentCorrect = this.getPercentageCorrect(this.state.dailyCorrect, this.getDailyAnswered())

    return (
      <Container>
        <Row>
          <h1>Your Stats</h1>
        </Row>
        <Row>
          <Col>
            <h3>Today</h3>
            <h4>{dailyPercentCorrect}</h4>
            <h4>Correct: {this.state.dailyCorrect}</h4>
            <h4>Incorrect: {this.state.dailyIncorrect}</h4>
            <h4>Skipped: {this.state.dailySkipped}</h4>
          </Col>
          <Col>
            <h3>Total</h3>
            <h4>{totalPercentCorrect}</h4>
            <h4>Correct: {this.state.overallCorrect}</h4>
            <h4>Incorrect: {this.state.overallIncorrect}</h4>
            <h4>Skipped: {this.state.overallSkipped}</h4>
          </Col>
        </Row>
      </Container>
    )
  }
}