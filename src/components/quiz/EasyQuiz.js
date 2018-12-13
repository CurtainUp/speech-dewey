import React, { Component } from 'react'
import { Container, Col, Row, Button } from 'reactstrap'
import API from "../../modules/API/API"
import moment from 'moment'
import QuizScore from './QuizScore'
import { Link } from 'react-router-dom'
import PeopleNeeded from './PeopleNeeded'
import UserSession from '../../modules/User/UserSession'
import Speak from '../speech/Speak'

export default class EasyQuiz extends Component {
  state = {
    words: [],
    possibleAnswers: [],
    status: "",
    qCounter: 0,
    answered: false,
    correct: 0,
    incorrect: 0,
    skipped: 0,
    initialize: false
  }


  shuffle = (array) => {
    let m = array.length, t, i

    // While there remain elements to shuffle…
    while (m) {

      // Pick a remaining element…
      i = Math.floor(Math.random() * m--)

      // And swap it with the current element.
      t = array[m]
      array[m] = array[i]
      array[i] = t
    }

    return array
  }

  // function to delay state change
  sleep = (time) => {
    return new Promise((resolve) => setTimeout(resolve, time))
  }

  increment = () => {
    return new Promise((resolve) => {
      let qNumber = this.state.qCounter
      return this.setState({ qCounter: qNumber + 1 }, () => resolve())
    })
  }

  getWords() {
    return new Promise((resolve) => {
      let newWords = {}
      return API.getWordsByCategory(this.props.category)
        // Shuffle words to randomize question order
        .then((words) => this.shuffle(words))
        // ****MIGHT NEED TO ADD SPLICE HERE TO GET FIRST 10 WORDS ONCE DATABASE IS LARGER***
        .then((words) => newWords.words = words)
        .then(() => this.setState(newWords, () => resolve()))
    })
  }

  getAnswers() {
    return new Promise((resolve) => {
      // Creates a new array of words from state
      let words = this.state.words.map(word => word)
      // Creates a new array with the correct answer and removes it from possible wrong answers
      let correct = words.splice(this.state.qCounter, 1)
      // Variable to receive promise of all possible wrong words
      let wrongShuffle

      // if statement prevents an attempt at finding answers once no correct answer is left
      if (correct.length !== 0) {
        // Grabs ALL words in hard coded database that are not the correct answer
        return API.getAllWrongWords(correct[0].id)
          .then((wrongWords) => {
            // Randomizes wrong answer possibilities
            wrongShuffle = this.shuffle(wrongWords)
            // Stores 2 wrong answer possibilities
            wrongShuffle = wrongShuffle.slice(0, 2)
          })
          .then(() => {
            //  The incorrect answers are added to possibleAnswers[]
            let possibleAnswers = wrongShuffle.map(word => word)
            // Adds correct answer to options
            possibleAnswers.push(correct[0])
            // Shuffles answer options and sets state
            this.shuffle(possibleAnswers)
            this.setState({ possibleAnswers: possibleAnswers, status: "" }, () => resolve())
          })
      }
    })
  }

  getPeopleAnswers() {
    return new Promise((resolve) => {
      // Creates a new array of words from state
      let words = this.state.words.map(word => word)
      // Creates a new array with the correct answer and removes it from possible wrong answers
      let correct = words.splice(this.state.qCounter, 1)
      // Variable to receive promise of all possible wrong words
      let wrongShuffle
      let currentUser = UserSession.getUser()

      // if statement prevents an attempt at finding answers once no correct answer is left
      if (correct.length !== 0) {
        // Grabs all user created cards that are not the correct answer
        return API.getUserWrongWords(currentUser, correct[0].id)
          .then((wrongWords) => {
            // Randomizes wrong answer possibilities
            wrongShuffle = this.shuffle(wrongWords)
            // Stores 2 wrong answer possibilities
            wrongShuffle = wrongShuffle.slice(0, 2)
          })
          .then(() => {
            //  The incorrect answers are added to possibleAnswers[]
            let possibleAnswers = wrongShuffle.map(word => word)
            // Adds correct answer to options
            possibleAnswers.push(correct[0])
            // Shuffles answer options and sets state
            this.shuffle(possibleAnswers)
            return this.setState({ possibleAnswers: possibleAnswers, status: "" }, () => resolve())
          })
      }
    })
  }


  handleAnswerClick = (e) => {
    let clicked = e.target
    let answerId = this.state.words[this.state.qCounter].id.toString()
    let correct = this.state.correct
    let incorrect = this.state.incorrect
    let skipped = this.state.skipped
    if (clicked.id === "skip") {
      return this.sleep(0)
        .then(() => this.setState({ status: "skipped", skipped: skipped + 1 }, () => this.answerLog()))
        .then(() => this.increment())
        .then(() => {
          if (this.props.category === 4) {
            this.getPeopleAnswers()
          } else {
            this.getAnswers()
          }
        })
    } else if (clicked.id !== answerId) {
      clicked.className = "answer btn btn-danger"
      this.sleep(500)
        .then(() => this.setState({ status: "incorrect", incorrect: incorrect + 1 }, () => this.answerLog()))
        .then(() => this.increment())
        .then(() => {
          if (this.props.category === 4) {
            this.getPeopleAnswers()
          } else {
            this.getAnswers()
          }
        })
    } else if (clicked.id === answerId) {
      clicked.className = "answer btn btn-success"
      this.sleep(500)
        .then(() => this.setState({ status: "correct", correct: correct + 1 }, () => this.answerLog()))
        .then(() => this.increment())
        .then(() => {
          if (this.props.category === 4) {
            this.getPeopleAnswers()
          } else {
            this.getAnswers()
          }
        })
    }
  }

  answerLog = () => {
    let time = moment()
    let answerData = {
      timestamp: time,
      cardId: this.state.words[this.state.qCounter].id,
      userId: parseInt(`${sessionStorage.getItem("id")}`),
      status: this.state.status
    }
    return API.saveData("cardScores", answerData)
  }

  componentDidMount() {
    return this.getWords()
      .then(() => this.state.words.map(word => word.word))
      .then((wordArray) => this.setState({ wordArray: wordArray }))
      .then(() => {
        if (this.props.category === 4) {
          return this.getPeopleAnswers()
        } else {
          return this.getAnswers()
        }
      })
      .then(() => this.setState({ initialize: true }))
  }


  componentWillUnmount() {
    return this.props.resetDifficulty("")
  }

  render() {
    if (this.state.initialize === true) {
      if (this.state.possibleAnswers.length < 3) {
        return <PeopleNeeded />
      }
      else if (this.state.words.length !== 0 && this.state.possibleAnswers.length !== 0 && this.state.status === "" && this.state.qCounter <= 9) {
        return (
          <Container>
            <Row>
              <Col><h3>Question {this.state.qCounter + 1} of 10</h3></Col>
            </Row>
            <Row className="d-flex inline justify-content-center">
              <Col>
                <div id={this.state.words[this.state.qCounter].id}>
                  <h1>{this.state.words[this.state.qCounter].word}</h1>
                </div>
                <div>
                  <Speak word={this.state.words[this.state.qCounter].word} />
                </div>
              </Col>
            </Row>
            {/* Need to refactor and add map function for all answer options below */}
            <Row className="d-flex justify-content-center">
              <Button className="answer" id={this.state.possibleAnswers[0].id} onClick={(e) => { this.handleAnswerClick(e) }
              }>
                <img alt="First Answer Option" src={this.state.possibleAnswers[0].image}></img>
              </Button>
              <Button className="answer" id={this.state.possibleAnswers[1].id} onClick={(e) => { this.handleAnswerClick(e) }
              }>
                <img alt="Second Answer Option" src={this.state.possibleAnswers[1].image}></img>
              </Button>
              <Button className="answer" id={this.state.possibleAnswers[2].id} onClick={(e) => { this.handleAnswerClick(e) }
              }>
                <img alt="Third Answer Option" src={this.state.possibleAnswers[2].image}></img>
              </Button>
            </Row>
            <Row className="d-flex justify-content-center">
              <Button tag={Link} to='/welcome' color="danger"><i className="fas fa-ban form-icon"></i></Button>
              <Button className="skip" id="skip" onClick={(e) => { this.handleAnswerClick(e) }}><i className="fas fa-forward form-icon" id="skip"></i></Button>
            </Row>
          </Container >
        )
      }
      // Loads Quiz Score upon completing 10 questions.
      else if (this.state.qCounter > 9) {
        return <QuizScore state={this.state} />
      } else return null
    }
    else {
      return <h1>Loading</h1>
    }
  }
}
