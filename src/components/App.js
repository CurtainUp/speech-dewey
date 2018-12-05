import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
// import {
//   Container, Col, Row, Button
// } from 'reactstrap'
import Landing from './start/Landing'

class App extends Component {
  // isAuthenticated = () => sessionStorage.getItem("id") !== null

  render() {
    return (
      <Switch>

        <Route exact path="/" render={(props) => {
          // if (this.isAuthenticated()) {
          //   return <Redirect to="/welcome" />
          // }
          return <Landing />
        }} />

        {/* <Route exact path="/login" render={props => {
          // if (this.isAuthenticated()) {
          //   return <Redirect to="/welcome" />
          // }
        //   return <Landing />
        // }} /> */}

      </Switch>
    )

  }
}

export default App;