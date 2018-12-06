import React, { Component } from 'react'
import { Container, Col, Row, Button } from 'reactstrap'

import API from "../../modules/API/API"


export default class Quiz extends Component {
  state = {
    words: [],
    answers: [],
    response: null,
    qCounter: 0
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
    this.setState({ answers: answers })
  }

  handleAnswerClick = (e) => {
    let clicked = e.target
    console.log(clicked)
    let answerId = this.state.words[this.state.qCounter].id.toString()
    if (clicked.id === answerId) {
      this.setState({ response: "correct" })
      console.log("Correct!")
    } else {
      this.setState({ response: "incorrect" })
      console.log("Incorrect!")
    }
  }

  handleColor = () => {
    if (this.state.response === "correct") {
      console.log("correct color")
      return "success"
    } else if (this.state.response === "incorrect") {
      console.log("incorrect color")
      return "danger"
    } else {
      console.log("no response yet")
      return "secondary"
    }
  }

  componentDidMount() {
    this.getWords()
      .then(() => this.state.words.map(word => word.word))
      .then((wordArray) => this.setState({ wordArray: wordArray }))
      .then(() => this.getAnswers())
  }

  render() {
    // Conditional that forces render to wait for all info to be received in state
    if (this.state.words.length !== 0 && this.state.answers.length !== 0) {
      return (
        <Container>
          <Row>
            <Col><h3>Question {this.state.qCounter + 1} of 10</h3></Col>
          </Row>
          <Row>
            <Col>
              <div id={this.state.words[this.state.qCounter].id}>
                <h1>{this.state.words[this.state.qCounter].word}</h1>
              </div>
            </Col>
          </Row>
          {/* Need to refactor and add map function for all answer options below */}
          <Row className="d-flex inline">
            <Col xs>
              <Button className="answer" id={this.state.answers[0].id} onClick={(e) => { this.handleAnswerClick(e) }
              } color={this.handleColor()}>
                <img alt="First Answer Option" src={this.state.answers[0].image}></img>
              </Button>
            </Col>
            <Col xs>
              <Button className="answer" id={this.state.answers[1].id} onClick={(e) => { this.handleAnswerClick(e) }
              } color={this.handleColor()}>
                <img alt="Second Answer Option" src={this.state.answers[1].image}></img>
              </Button>
            </Col>
            <Col xs>
              <Button className="answer" id={this.state.answers[2].id} onClick={(e) => { this.handleAnswerClick(e) }
              } color={this.handleColor()}>
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