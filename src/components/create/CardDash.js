import React, { Component } from 'react'
import { Button } from 'reactstrap'
import { Link } from 'react-router-dom'

export default class CardDash extends Component {

  render() {
    return (
      <div>
        <div>
          <h1>Cards</h1>
        </div>
        <div>
          <Button tag={Link} to='/create'><i className="fas fa-file-medical"></i><h3>Create</h3></Button>
          <Button><i className="fas fa-images"></i><h3>Your Cards</h3></Button>
        </div>
      </div>
    )
  }
}