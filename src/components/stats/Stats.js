import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap';
import API from "../../modules/API/API"
import UserSession from '../../modules/User/UserSession'
import moment from 'moment'
import { ResponsiveContainer, PieChart, Pie } from 'recharts'
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
    return total
  }

  // Sets activity in lifted state
  setActivity = () => {
    if (this.state.dailyCorrect !== 0 || this.state.dailyIncorrect !== 0 || this.state.dailySkipped !== 0) {
      let dailyActivity = true
      return this.props.resetActivity(dailyActivity)
    }
  }

  // Displays message or stats depending on if user has taken a quiz today
  dailyDisplay() {
    if (this.props.activeToday === true) {
      return <Col>
        <ResponsiveContainer height={250} width="100%">
          <PieChart width={400} height={250}>
            <Pie data={[{ name: 'Daily Correct', value: this.state.dailyCorrect, fill: '#00ff60' }, { name: 'Daily Incorrect', value: this.state.dailyIncorrect, fill: '#ff0000' },
            { name: 'Daily Skipped', value: this.state.dailySkipped, fill: '#ffc107' }]} dataKey="value" nameKey="name" cx="50%" cy="50%" isAnimationActive={false} />
          </PieChart>
        </ResponsiveContainer>
        <h4>{this.state.dailyPercentCorrect}</h4>
        <Row className="d-flex inline">
          <div className="d-flex inline align-items-center mx-3">
            <i className="fas fa-check form-icon" style={{ color: "#00ff60" }}></i> <h4>{this.state.dailyCorrect}</h4>
            <i className="fas fa-times form-icon" style={{ color: "#ff0000" }}></i> <h4>{this.state.dailyIncorrect}</h4>
            <i className="fas fa-forward form-icon" style={{ color: "#ffc107" }}></i> <h4>{this.state.dailySkipped}</h4>
          </div>
        </Row>
      </Col>
    } else {
      return <Col>
        <div className="m-3">

          <h4>No Quizzes Taken Today</h4>
        </div>
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
        <Row className="d-flex inline">
          <Col className="stat-card">
            <div className="m-3">
              <h3>Today</h3>
              {this.dailyDisplay()}
            </div>
          </Col>
          <Col className="stat-card">
            <div className="m-3">
              <h3>Total</h3>
              <ResponsiveContainer height={250} width="100%">
                <PieChart width={400} height={250}>
                  <Pie data={[{ name: 'Total Correct', value: this.state.overallCorrect, fill: '#00ff60' }, { name: 'Total Incorrect', value: this.state.overallIncorrect, fill: '#ff0000' },
                  { name: 'Total Skipped', value: this.state.overallSkipped, fill: '#ffc107' }]} dataKey="value" nameKey="name" cx="50%" cy="50%" />
                </PieChart>
              </ResponsiveContainer>
              <h4>{this.state.totalPercentCorrect}</h4>
              <Row className="d-flex inline align-items-center">
                <i className="fas fa-check form-icon" style={{ color: "#00ff60" }}></i> <h4>{this.state.overallCorrect}</h4>
                <i className="fas fa-times form-icon" style={{ color: "#ff0000" }}></i> <h4>{this.state.overallIncorrect}</h4>
                <i className="fas fa-forward form-icon" style={{ color: "#ffc107" }}></i> <h4>{this.state.overallSkipped}</h4>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    )
  }
}