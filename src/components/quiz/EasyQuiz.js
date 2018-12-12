import React, { Component } from 'react'
import { Container, Col, Row, Button } from 'reactstrap'
import API from "../../modules/API/API"
import moment from 'moment'
import QuizScore from './QuizScore';
import { Link } from 'react-router-dom'
import PeopleNeeded from './PeopleNeeded';

export default class EasyQuiz extends Component {
  state = {
    words: [],
    answers: [],
    status: "",
    qCounter: 0,
    answered: false,
    correct: 0,
    incorrect: 0,
    skipped: 0
  }


  shuffle = (array) => {
    let m = array.length, t, i

    // While there remain elements to shuffle…
    while (m) {

      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);

      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }

    return array;
  }

  // function to delay state change
  sleep = (time) => {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  increment = () => {
    return new Promise((resolve) => {
      let qNumber = this.state.qCounter
      return this.setState({ qCounter: qNumber + 1 }, () => resolve())
    })
  }

  getWords() {
    let newWords = {}
    return API.getWordsByCategory(this.props.category)
      // Shuffle words to randomize question order
      .then((words) => this.shuffle(words))
      .then((words) => newWords.words = words)
      .then(() => this.setState(newWords))
  }

  getAnswers() {
    return new Promise((resolve) => {
      // Creates a new array of words from state
      let wrongWords = this.state.words.map(word => word)
      // Creates a new away with the correct answer and removes it from possible wrong answers
      let correct = wrongWords.splice(this.state.qCounter, 1)
      // Randomizes wrong answer possibilities
      let wordShuffle = this.shuffle(wrongWords)
      // Stores 2 wrong answer possibilities and puts them into answers[]
      wordShuffle = wordShuffle.slice(0, 2)
      let answers = wordShuffle.map(word => word)
      // Adds correct answer to options
      answers.push(correct[0])
      // Shuffles answer options and sets state
      this.shuffle(answers)
      this.setState({ answers: answers, status: "" }, () => resolve())
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
        .then(() => this.getAnswers())
    } else if (clicked.id !== answerId) {
      clicked.className = "answer btn btn-danger"
      this.sleep(500)
        .then(() => this.setState({ status: "incorrect", incorrect: incorrect + 1 }, () => this.answerLog()))
        .then(() => this.increment())
        .then(() => this.getAnswers())
    } else if (clicked.id === answerId) {
      clicked.className = "answer btn btn-success"
      this.sleep(500)
        .then(() => this.setState({ status: "correct", correct: correct + 1 }, () => this.answerLog()))
        .then(() => this.increment())
        .then(() => this.getAnswers())
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
    this.getWords()
      .then(() => this.state.words.map(word => word.word))
      .then((wordArray) => this.setState({ wordArray: wordArray }))
      .then(() => this.getAnswers())
  }

  componentWillUnmount() {
    return this.props.resetDifficulty("")
  }


  render() {
    if (this.state.words.length < 10) {
      return <PeopleNeeded />
    }
    else if (this.state.words.length !== 0 && this.state.answers.length !== 0 && this.state.status === "" && this.state.qCounter <= 9) {
      return (
        <Container>
          <Row>
            <Col><h3>Question {this.state.qCounter + 1} of 10</h3></Col>
          </Row>
          <Row className="d-flex inline">
            <Col>
              <div id={this.state.words[this.state.qCounter].id}>
                <h1>{this.state.words[this.state.qCounter].word}</h1>
              </div>
            </Col>
            <Col>
              <Button className="skip" id="skip" onClick={(e) => { this.handleAnswerClick(e) }}><i className="fas fa-forward form-icon" id="skip"></i></Button>
            </Col>
          </Row>
          {/* Need to refactor and add map function for all answer options below */}
          <Row className="d-flex inline">
            <Col xs>
              <Button className="answer" id={this.state.answers[0].id} onClick={(e) => { this.handleAnswerClick(e) }
              }>
                <img alt="First Answer Option" src={this.state.answers[0].image}></img>
              </Button>
            </Col>
            <Col xs>
              <Button className="answer" id={this.state.answers[1].id} onClick={(e) => { this.handleAnswerClick(e) }
              }>
                <img alt="Second Answer Option" src={this.state.answers[1].image}></img>
              </Button>
            </Col>
            <Col xs>
              <Button className="answer" id={this.state.answers[2].id} onClick={(e) => { this.handleAnswerClick(e) }
              }>
                <img alt="Third Answer Option" src={this.state.answers[2].image}></img>
              </Button>
            </Col>
          </Row>
          <Row><Button tag={Link} to='/welcome' color="danger"><i className="fas fa-ban form-icon"></i></Button></Row>
        </Container >
      )
    }
    // Loads Quiz Score upon completing 10 questions.
    else if (this.state.qCounter > 9) {
      return <QuizScore state={this.state} />
    }
    else {
      return <h1>Loading</h1>
    }
  }
}