import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Link } from 'react-router-dom'
import API from '../../modules/API/API'
import UserSession from '../../modules/User/UserSession'

class QuizScore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      correct: 0,
      incorrect: 0,
      skipped: 0,
      percentCorrect: 0,
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }



  getAnswerScore = () => {
    let answers = {
      correct: 0,
      incorrect: 0,
      skipped: 0
    }

    let currentUser = UserSession.getUser()
    // Fetches last 10 cardScores from database
    API.getQuizResponses(currentUser)
      .then(response => response.map((score) => {
        if (score.status === "correct") {
          answers.correct += 1
        } else if (score.status === "incorrect") {
          answers.incorrect += 1
        } else if (score.status === "skipped") {
          answers.skipped += 1
        }
        // returns final tabulation of each answer type.
        return answers
      }))
      // Set state with answer totals
      .then(() => this.setState({ correct: answers.correct, incorrect: answers.incorrect, skipped: answers.skipped }))
      .then(() => this.getPercentageCorrect())
  }


  getPercentageCorrect = () => {
    let percentCorrect = (this.state.correct / (10 - this.state.skipped)) * 100
    percentCorrect = percentCorrect.toString() + "%"
    this.setState({percentCorrect: percentCorrect})
  }

  componentDidMount() {
    this.getAnswerScore()
  }

  render() {
    return (
      <div>
        <Button className="card-button" onClick={this.toggle}><i className="fas fa-trash-alt form-icon"></i><h3>Score</h3></Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}><h2>Your Score:</h2></ModalHeader>
          <ModalBody>
            <h4>*category*</h4>
            <p className="modal-p">{this.state.percentCorrect}</p>
            <h3>Correct: {this.state.correct}</h3>
            <h3>Incorrect: {this.state.incorrect}</h3>
            <h3>Skipped: {this.state.skipped}</h3>
          </ModalBody>
          <ModalFooter>
            <Button color="success" className="modal-button"><i className="fas fa-check form-icon"></i><h3>Retry</h3></Button>{' '}
            <Button color="danger" className="modal-button" onClick={this.toggle}><i className="fas fa-ban form-icon"></i><h3>Home</h3></Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default QuizScore;