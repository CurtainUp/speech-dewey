import React, { Component } from 'react';
import { Row, Jumbotron} from 'reactstrap'
import Login from './Login'
import Register from './Register'

export default class Landing extends Component {

  render() {
    return (
      <React.Fragment>
        <Jumbotron className="m-3">
          <h1 className="display-3">Speech Dewey</h1>
          <hr className="my-2" />
          <Row className="d-flex inline">
            <Login {...this.props} />
            <Register {...this.props}/>
          </Row>
        </Jumbotron>
      </React.Fragment>
    )
  }
}