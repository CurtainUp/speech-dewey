import React, { Component } from 'react'
import { Container, Col, Row, Button } from 'reactstrap'
import API from "../../modules/API/API"

let qNumber = 0

export default class Quiz extends Component {
  state = {
    words: [],
    answers: [],
    status: null,
    // qCounter: 0,
    answered: false
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

  // need to Fetch 1 word with matching category id from QuizSelect
  getWords() {
    let newWords = {}
    return API.getData("cards")
      .then((words) => newWords.words = words)
      .then(() => this.setState(newWords))
  }

  getAnswers() {
    // Creates a new array of words from state
    let wrongWords = this.state.words.map(word => word)
    // Creates a new away with the correct answer and removes it from possible wrong answers
    let correct = wrongWords.splice(qNumber, 1)
    console.log(correct)
    // Randomizes wrong answer possibilities
    let wordShuffle = this.shuffle(wrongWords)
    // Stores 2 wrong answer possibilities and puts them into answers[]
    wordShuffle = wordShuffle.slice(0, 2)
    let answers = wordShuffle.map(word => word)
    // Adds correct answer to options
    answers.push(correct[0])
    // Shuffles answer options and sets state
    this.shuffle(answers)
    this.setState({ answers: answers })
  }

  // function to delay state change
  sleep = (time) => {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  handleAnswerClick = (e) => {
    let clicked = e.target
    let answerId = this.state.words[qNumber].id.toString()
    if (clicked.id === answerId) {
      clicked.className = "answer btn btn-success"
      this.sleep(2000)
        .then(() => this.setState({ status: "correct", answered: true }))
    } else {
      clicked.className = "answer btn btn-danger"
      this.sleep(2000)
        .then(() => this.setState({ status: "incorrect", answered: true }))
    }
  }

  answerLog = () => {
    let answerData = {
      timestamp: null,
      cardId: this.state.words[qNumber].id,
      userId: `${sessionStorage.getItem("id")}`,
      status: this.state.status
    }
    console.log(answerData)

    API.saveData("cardScores", answerData)
  }

  componentDidMount() {
    this.getWords()
      .then(() => this.state.words.map(word => word.word))
      .then((wordArray) => this.setState({ wordArray: wordArray }))
      .then(() => this.getAnswers())
  }

  render() {

    // Conditional that forces render to wait for all info to be received in state
    if (this.state.words.length !== 0 && this.state.answers.length !== 0 && this.state.status !== null) {
      this.answerLog()
      qNumber += 1
      if (qNumber < 10) {
        return <Quiz />
      } else {
        return (<div>Quiz Complete!</div>)
      }

    } else if (this.state.words.length !== 0 && this.state.answers.length !== 0 && this.state.status === null) {
      return (
        <Container>
          <Row>
            <Col><h3>Question {qNumber + 1} of 10</h3></Col>
          </Row>
          <Row>
            <Col>
              <div id={this.state.words[qNumber].id}>
                <h1>{this.state.words[qNumber].word}</h1>
              </div>
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
        </Container >

      )
    } else {
      return <h1>Loading</h1>
    }
  }
}