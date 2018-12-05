import React, { Component } from 'react';
import { Row, Jumbotron, Button } from 'reactstrap'
// import TestCard from '../card/TestCard';

export default class Landing extends Component {

  render() {
    return (
      <React.Fragment>
        <Jumbotron className="m-3">
          <h1 className="display-3">Speech Dewey</h1>
          <hr className="my-2" />
          <Row>
            <Button className="mr-1" size="xl">Login</Button>
            <Button size="xl">New</Button>
          </Row>
        </Jumbotron>
        {/* <TestCard></TestCard> */}
      </React.Fragment>
    )
  }
}