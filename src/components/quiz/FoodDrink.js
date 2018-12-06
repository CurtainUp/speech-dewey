import React, { Component } from 'react'
import { Container, Card, CardText } from 'reactstrap'

import API from "../../modules/API/API"


export default class FoodDrink extends Component {
  state = {
    words: [],
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
      // <img alt={card.word} src={card.image}></img>

    )
  }
}