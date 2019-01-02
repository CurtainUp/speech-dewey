// All code related to the Quiz component of Speech Dewey

import React, { Component } from 'react'
import { Container, Col, Row, Button } from 'reactstrap'
import API from "../../modules/API/API"
import moment from 'moment'
import QuizScore from './QuizScore'
import { Link } from 'react-router-dom'
import PeopleNeeded from './PeopleNeeded'
import UserSession from '../../modules/User/UserSession'
import Speak from '../speech/Speak'

export default class Quiz extends Component {
  state = {
    words: [],
    possibleAnswers: [],
    status: "",
    qCounter: 0,
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
      if (correct.length !== 0 && this.props.difficulty === "easy") {
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
      } else if (correct.length !== 0 && this.props.difficulty === "medium") {
        return API.getAllWrongWords(correct[0].id)
          .then((wrongWords) => {
            // Randomizes wrong answer possibilities
            wrongShuffle = this.shuffle(wrongWords)
            // Stores 2 wrong answer possibilities
            wrongShuffle = wrongShuffle.slice(0, 4)
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
      if (correct.length !== 0 && this.props.difficulty === "easy") {
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
      } else if (correct.length !== 0 && this.props.difficulty === "medium") {
        return API.getUserWrongWords(currentUser, correct[0].id)
          .then((wrongWords) => {
            // Randomizes wrong answer possibilities
            wrongShuffle = this.shuffle(wrongWords)
            // Stores 2 wrong answer possibilities
            wrongShuffle = wrongShuffle.slice(0, 4)
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
    let clicked = e.currentTarget
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
      clicked.className += " btn btn-danger"
      this.sleep(1000)
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
      clicked.className += " btn btn-success"
      this.sleep(1000)
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
    let currentWord = this.state.words[this.state.qCounter]

    if (this.state.initialize === true) {
      if (this.state.possibleAnswers.length < 3) {
        return <PeopleNeeded />
      }
      else if (this.state.words.length !== 0 && this.state.possibleAnswers.length !== 0 && this.state.status === "" && this.state.qCounter <= 9) {
        return (
          <Container className="quizframe">
            <Row>
              <Col><h3>Question {this.state.qCounter + 1} of 10</h3></Col>
            </Row>
            <Row className="d-flex inline justify-content-center">
              <Col>
                <div id={currentWord.id}>
                  <h1>{currentWord.word}</h1>
                </div>
                <div>
                  <Speak word={currentWord.word} />
                </div>
              </Col>
            </Row>
            {/* Need to refactor and add map function for all answer options below */}
            <Row>
              <div className="d-flex justify-content-center">
                {
                  this.state.possibleAnswers.map((option) =>
                    <Button className="answer" key={option.id} id={option.id} onClick={(e) => { this.handleAnswerClick(e) }}>
                      <img id={option.id} alt="Answer Option" src={option.image}></img>
                    </Button>
                  )
                }
              </div>
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
