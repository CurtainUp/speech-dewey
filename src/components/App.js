import React, { Component } from 'react';
import {
  Container, Card, CardGroup, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Col, Button
} from 'reactstrap'

class App extends Component {

  render() {
    return (
      <Container>
        <Col>
          <CardGroup>
            <Card>
              <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
              <CardBody>
                <CardTitle>Card title</CardTitle>
                <CardSubtitle>Card subtitle</CardSubtitle>
                <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                <Button>Button</Button>
              </CardBody>
            </Card>
            <Card body>
              <CardTitle>Special Title Treatment</CardTitle>
              <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
              <Button>Go somewhere</Button>
            </Card>
          </CardGroup>
        </Col>
      </Container>
    )
  }
}

export default App;