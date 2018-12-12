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
    overallSkipped: 0,
    totalPercentCorrect: 0,
    dailyPercentCorrect: 0,
  }

  // ------Functions for Daily Stats----------

  getDailyTally = () => {
    return new Promise((resolve) => {
      let today = moment()
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
            } return null
          })
        })
        .then(() => { return this.setState({ dailyCorrect: daily.dailyCorrect, dailyIncorrect: daily.dailyIncorrect, dailySkipped: daily.dailySkipped, activeToday: true }, () => resolve()) })
    })
  }

  // Calculates total cards answered today
  getDailyAnswered = () => {
    let total = this.state.dailyCorrect + this.state.dailyIncorrect + this.state.dailySkipped
    console.log(total)
    return total
  }

  // Sets activity in local state
  // checkDailyActivity = () => {
  //   return new Promise((resolve) => {
  //     if (this.state.dailyCorrect !== 0 || this.state.dailyIncorrect !== 0 || this.state.dailySkipped !== 0) {
  //       return this.setState({ activeToday: true }, () => resolve())
  //     }
  //   })
  // }

  // Sets activity in lifted state
  setActivity = () => {
    if (this.state.dailyCorrect !== 0 || this.state.dailyIncorrect !== 0 || this.state.dailySkipped !== 0) {
      let dailyActivity = true
      console.log(dailyActivity)
      return this.props.resetActivity(dailyActivity)
    }
  }

  // Displays message or stats depending on if user has taken a quiz today
  dailyDisplay() {
    if (this.props.activeToday === true) {
      return <Col>
        <h4>{this.state.dailyPercentCorrect}</h4>
        <h4>Correct: {this.state.dailyCorrect}</h4>
        <h4>Incorrect: {this.state.dailyIncorrect}</h4>
        <h4>Skipped: {this.state.dailySkipped}</h4>
      </Col>
    } else {
      return <Col>
        <h4>No Quizzes Taken Today</h4>
      </Col>
    }
  }

  // ------Functions for Overall Stats----------

  getOverallTally = () => {
    return new Promise((resolve) => {
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
        .then(() => { return this.setState({ overallCorrect: overall.overallCorrect, overallIncorrect: overall.overallIncorrect, overallSkipped: overall.overallSkipped }, () => resolve()) }
        )
    })
  }

  // Calculates total cards answered
  getTotalAnswered = () => {
    let total = this.state.overallCorrect + this.state.overallIncorrect + this.state.overallSkipped
    return total
  }

  // ------Functions for converting stats to %----------

  // Basic function to calculate percent of correct answers
  getPercentageCorrect = (right, total) => {
    let percentCorrect = (right / total) * 100
    percentCorrect = Math.round(percentCorrect)
    percentCorrect = percentCorrect.toString() + "%"
    return percentCorrect
  }

  // Adds calculated percentages to state for initial render of page
  setPercentageState = () => {
    return new Promise((resolve) => {
      let totalPercentCorrect = this.getPercentageCorrect(this.state.overallCorrect, this.getTotalAnswered())
      let dailyPercentCorrect = this.getPercentageCorrect(this.state.dailyCorrect, this.getDailyAnswered())
      return this.setState({ totalPercentCorrect: totalPercentCorrect, dailyPercentCorrect: dailyPercentCorrect }, () => resolve())
    })
  }

  // ------Functions for displaying component----------

  componentDidMount = () => {
    this.getOverallTally()
      .then(() => this.getDailyTally())
      .then(() => this.setPercentageState())
      .then(() => this.setActivity())
  }

  render() {

    return (
      <Container>
        <Row>
          <h1>Your Stats</h1>
        </Row>
        <Row>
          <h3>Today</h3>
          {this.dailyDisplay()}
          <Col>
            <h3>Total</h3>
            <h4>{this.state.totalPercentCorrect}</h4>
            <h4>Correct: {this.state.overallCorrect}</h4>
            <h4>Incorrect: {this.state.overallIncorrect}</h4>
            <h4>Skipped: {this.state.overallSkipped}</h4>
          </Col>
        </Row>
      </Container>
    )
  }
}