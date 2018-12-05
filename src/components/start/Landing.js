import React, { Component } from 'react';
import { Row, Jumbotron, Button } from 'reactstrap'
import Login from './Login'
import Register from './Register'
import { Redirect } from 'react-router-dom'
// import UserSession from '../../modules/User/UserSession'
// import TestCard from '../card/TestCard';

export default class Landing extends Component {

  // state = {
  //   loginSuccess: false
  // }

  // checkSuccess = () => {
  //   return this.setState({loginSuccess: true})
  // }


  render() {
    // if (this.state.loginSuccess === true) {
    //   return <Redirect to="/" />
    // }
    return (
      <React.Fragment>
        <Jumbotron className="m-3">
          <h1 className="display-3">Speech Dewey</h1>
          <hr className="my-2" />
          <Row>
            <Login />
            <Register />
          </Row>
        </Jumbotron>
        {/* <TestCard></TestCard> */}
      </React.Fragment>
    )
  }
}