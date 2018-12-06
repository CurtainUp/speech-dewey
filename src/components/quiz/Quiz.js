import React, { Component } from 'react'
import { Container, Col, Row } from 'reactstrap'

import API from "../../modules/API/API"


export default class Quiz extends Component {
  state = {
    words: [],
    answers: [],
    qCounter: 0
  }

  // need to Fetch 1 word with matching category id from QuizSelect
  getWords() {
    let newWords = {}
    return API.getData("cards")
      .then((words) => newWords.words = words)
      .then(() => this.setState(newWords))
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

  getAnswers() {
    let wrongWords = this.state.words.slice(this.state.qCounter + 1)
    let wordShuffle = this.shuffle(wrongWords)
    wordShuffle = wordShuffle.slice(0, 2)
    let answers = wordShuffle.map(word => word)
    answers.push(this.state.words[this.state.qCounter])
    this.shuffle(answers)
    this.setState({ answers: answers })
  }

  componentDidMount() {
    this.getWords()
      .then(() => this.state.words.map(word => word.word))
      .then((wordArray) => this.setState({ wordArray: wordArray }))
      .then(() => this.getAnswers())
  }

  render() {
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
          <Row className="d-flex inline">
            <Col xs><div className="answer"><img alt="First Answer Option" src={this.state.answers[0].image}></img></div></Col>
            <Col xs><div className="answer"><img alt="Second Answer Option" src={this.state.answers[1].image}></img></div></Col>
            <Col xs><div className="answer"><img alt="Third Answer Option" src={this.state.answers[2].image}></img></div></Col>
          </Row>
        </Container>

      )
    } else {
      return <h1>Loading</h1>
    }
  }
}