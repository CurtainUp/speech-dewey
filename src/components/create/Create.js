import React, { Component } from 'react'
import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap'
import { Link } from 'react-router-dom'
import API from '../../modules/API/API'
import UserSession from '../../modules/User/UserSession'

export default class Create extends Component {
  state = {
    word: "",
    relationship: "",
    image: ""
  }

  handleFieldChange = e => {
    const stateToChange = {}
    stateToChange[e.target.id] = e.target.value
    console.log(stateToChange)
    this.setState(stateToChange)
  }

  cardObject = () => {
    let newCard = {
      userId: UserSession.getUser(),
      categoryId: 1,
      word: this.state.word,
      image: this.state.image,
      relationship: this.state.relationship,
      audioUrl: ""
    }
    return newCard
  }

  saveCard = (e) => {
    e.preventDefault()
    let newCard = this.cardObject()
    API.saveData("cards", newCard)
  }

  render() {
    return (
      <div>
        <Form onSubmit={(e) => this.saveCard(e)}>
          <FormGroup row>
            <Label for="Word" sm={2}>Word or Name</Label>
            <Col sm={10}>
              <Input type="text" name="word" id="word" required onChange={this.handleFieldChange}/>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="Relationship" sm={2}>Relationship</Label>
            <Col sm={10}>
              <Input type="text" name="relationship" id="relationship" onChange={this.handleFieldChange}/>
            </Col>
          </FormGroup>
          <FormGroup>
          <Label for="Image">Image Url</Label>
          <Input type="url" name="image" id="image" onChange={this.handleFieldChange}/>
        </FormGroup>
        <Button type="submit"><i className="fas fa-arrow-circle-right"></i><h3>Save</h3></Button>
        <Button tag={Link} to='/cards'><i className="fas fa-ban"></i><h3>Cancel</h3></Button>
        </Form>
      </div>
    )
  }
}