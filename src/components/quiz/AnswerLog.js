import React, { Component } from 'react'
import API from "../../modules/API/API"

export default class AnswerLog extends Component {

answerLog = () => {
  let answerData = {
    timestamp: null,
    cardId: this.props.words[this.props.qCounter].id,
    userId: `${sessionStorage.getItem("id")}`,
    status: this.props.status

  }
  console.log(answerData)
  API.saveData("cardScores", object)
}
}