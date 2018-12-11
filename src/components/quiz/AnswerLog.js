// import React, { Component } from 'react'
// import API from "../../modules/API/API"
// import moment from 'moment'

// export default class AnswerLog extends Component {

// answerLog = () => {
//   let time = moment()
//   let answerData = {
//     timestamp: time,
//     cardId: this.props.words[this.props.qCounter].id,
//     userId: `${sessionStorage.getItem("id")}`,
//     status: this.props.status

//   }
//   console.log(answerData)
//   return API.saveData("cardScores", answerData)
// }
// }