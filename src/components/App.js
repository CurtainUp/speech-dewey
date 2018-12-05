import React, { Component } from 'react';
import {
  Container, Col, Row, Button
} from 'reactstrap'
import Landing from './start/Landing'

class App extends Component {

  render() {
    return (
      <Container>
        <Landing />
      </Container>
    )

  }
}

export default App;