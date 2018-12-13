import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row } from 'reactstrap'
import { Link, Redirect } from 'react-router-dom'
import { ResponsiveContainer, PieChart, Pie } from 'recharts'

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
    let percentCorrect
    if (this.props.state.skipped === 10) {
      percentCorrect = 0
    } else {
      percentCorrect = (this.props.state.correct / (10 - this.props.state.skipped)) * 100
      percentCorrect = Math.round(percentCorrect)
    }

    percentCorrect = percentCorrect.toString() + "%"
    this.setState({ percentCorrect: percentCorrect })
  }

  componentDidMount() {
    this.getPercentageCorrect()
  }

  render() {

    if (this.state.modal === false) {
      return <Redirect to="/welcome" />
    }
    return (
      <div>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader><h2>Your Score</h2></ModalHeader>
          <ModalBody>
            {/* <p className="modal-p">{this.state.percentCorrect}</p>
            <h3>Correct: {this.props.state.correct}</h3>
            <h3>Incorrect: {this.props.state.incorrect}</h3>
            <h3>Skipped: {this.props.state.skipped}</h3> */}
            <ResponsiveContainer height={250} width="100%">
          <PieChart width={400} height={250}>
            <Pie data={[{ name: 'Correct', value: this.props.state.correct, fill: '#00ff60' }, { name: 'Incorrect', value: this.props.state.incorrect, fill: '#ff0000' },
            { name: 'Skipped', value: this.props.state.skipped, fill: '#ffc107' }]} dataKey="value" nameKey="name" cx="50%" cy="50%" isAnimationActive={true} />
          </PieChart>
        </ResponsiveContainer>
        <h4>{this.state.dailyPercentCorrect}</h4>
        <Row className="d-flex inline">
          <div className="d-flex inline align-items-center mx-3">
            <i className="fas fa-check form-icon" style={{ color: "#00ff60" }}></i> <h4>{this.props.state.correct}</h4>
            <i className="fas fa-times form-icon" style={{ color: "#ff0000" }}></i> <h4>{this.props.state.incorrect}</h4>
            <i className="fas fa-forward form-icon" style={{ color: "#ffc107" }}></i> <h4>{this.props.state.skipped}</h4>
          </div>
        </Row>
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