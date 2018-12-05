import React, { Component } from 'react'
import { Button } from 'reactstrap'

export default class Welcome extends Component {

  render() {
    return (
      <div>
        <div>
          <h1>Choose a Category</h1>
        </div>
        <div>
          <Button><i className="fas fa-utensils"></i><h3>Food & Drink</h3></Button>
          <Button><i className="fas fa-medkit"></i><h3>Mood & Health</h3></Button>
          <Button><i className="fas fa-home"></i><h3>Home & Clothes</h3></Button>
          <Button><i className="fas fa-users"></i><h3>Friends & Family</h3></Button>
        </div>
      </div>
    )
  }
}