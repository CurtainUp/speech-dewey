import React, { Component } from 'react'

export default class Stats extends Component {

  // Basic function to calculate percent of correct answers
  getPercentageCorrect = (right, total) => {
    let percentCorrect = (right / total) * 100
    percentCorrect = percentCorrect.toString() + "%"
    return percentCorrect
  }

  render() {
    return (
      <div>
        <h1>Your Stats</h1>
      </div>
    )
  }
}