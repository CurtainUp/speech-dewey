import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { Link } from 'react-router-dom'


class QuizScore extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      percentCorrect: 0,
      modal: true
    }

    this.toggle = this.toggle.bind(this)
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    })
  }


  getPercentageCorrect = () => {
    let percentCorrect = (this.props.state.correct / (10 - this.props.state.skipped)) * 100
    percentCorrect = Math.round(percentCorrect)
    percentCorrect = percentCorrect.toString() + "%"
    this.setState({percentCorrect: percentCorrect})
  }

  componentDidMount() {
    this.getPercentageCorrect()
  }

  render() {
    return (
      <div>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}><h2>Your Score:</h2></ModalHeader>
          <ModalBody>
            <p className="modal-p">{this.state.percentCorrect}</p>
            <h3>Correct: {this.props.state.correct}</h3>
            <h3>Incorrect: {this.props.state.incorrect}</h3>
            <h3>Skipped: {this.props.state.skipped}</h3>
          </ModalBody>
          <ModalFooter>
            <Button tag={Link} to='/quiz-select' color="success" className="modal-button"><i className="fas fa-check form-icon"></i><h3>Retry</h3></Button>{' '}
            <Button tag={Link} to='/welcome' color="danger" className="modal-button"><i className="fas fa-ban form-icon"></i><h3>Home</h3></Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default QuizScore;