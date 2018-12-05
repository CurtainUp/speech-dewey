import React, { Component } from 'react'
import API from "../../modules/API/API"


export default class Quiz extends Component {
  state = {
    words: [],
    images: []
  }

  getWords() {
    let newWords = {}
    return API.getData("cards")
      .then((words) => newWords.words = words)
      .then(() => this.setState(newWords))
  }

  componentDidMount() {
    this.getWords()
  }

  render() {
    return (
      <div>
        {this.state.words.map((card) =>
            <li key={card.id}>{card.word}</li>
        )}
      </div>
    )
  }
}