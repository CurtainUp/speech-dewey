import React, { Component } from 'react'
import { Button } from 'reactstrap'
import { Link } from 'react-router-dom'

export default class QuizSelect extends Component {
  state = {
    clicked: false,
    category: ""
  }

  show = () => {
    this.setState({
      clicked: !this.state.clicked
    })
  }

  quizCategory = () => {
    this.setState()
  }

  render() {

    return (
      <div>
        <div>
          <h1>Choose a Category</h1>
        </div>
        <div>
          <Button tag={Link} to='/food-quiz'><i className="fas fa-utensils"></i><h3>Food & Drink</h3></Button>
          <Button tag={Link} to='/mood-quiz'><i className="fas fa-medkit"></i><h3>Mood & Health</h3></Button>
          <Button tag={Link} to='/home-quiz'><i className="fas fa-home"></i><h3>Home & Clothes</h3></Button>
          <Button tag={Link} to='/people-quiz'><i className="fas fa-users"></i><h3>Friends & Family</h3></Button>
        </div>
      </div>
    )
  }
}