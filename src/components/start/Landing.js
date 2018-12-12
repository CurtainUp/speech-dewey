import React, { Component } from 'react';
import { Row, Jumbotron} from 'reactstrap'
import Login from './Login'
import Register from './Register'
// import Background from '../Book_Banner.jpg'
import Background from '../Book_Row.jpg'

export default class Landing extends Component {

  render() {
    return (
      <React.Fragment>
          <h1 className="display-3">Speech Dewey</h1>
          <hr className="my-2" />
        <Jumbotron className="m-3" style={{backgroundImage: "url(" + Background + ")"}}>
          {/* <Row className="d-flex inline justify-content-center"> */}
          <Row className="d-flex justify-content-around">
            <Login {...this.props} />
            <Register {...this.props}/>
          </Row>
        </Jumbotron>
      </React.Fragment>
    )
  }
}