import React, { Component } from 'react'
import { Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import Quiz from './Quiz'

export default class QuizSelect extends Component {
  state = {
    clicked: false
  }

  show = () => {
    this.setState({
      clicked: !this.state.clicked
    })
  }

  render() {
    return (
      <div>
        <div>
          <h1>Choose a Category</h1>
        </div>
        <div>
          <Button onClick={() => this.show()}><i className="fas fa-utensils"></i><h3>Food & Drink</h3></Button>
          {this.state.clicked && <Quiz />}
          <Button><i className="fas fa-medkit"></i><h3>Mood & Health</h3></Button>
          <Button><i className="fas fa-home"></i><h3>Home & Clothes</h3></Button>
          <Button><i className="fas fa-users"></i><h3>Friends & Family</h3></Button>
        </div>
      </div>
    )
  }
}