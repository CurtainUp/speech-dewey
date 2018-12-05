import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import Landing from './start/Landing'
import Welcome from './start/Welcome'
import Quiz from './quiz/Quiz'
import Stats from './stats/Stats'
import Create from './create/Create'


class App extends Component {
  isAuthenticated = () => sessionStorage.getItem("id") !== null

  render() {
    return (
      <Switch>

        <Route exact path="/" render={(props) => {
          if (this.isAuthenticated()) {
            return <Redirect to="/welcome" />
          }
          return <Landing {...props} />
        }} />

        <Route exact path="/welcome" render={props => {
          if (this.isAuthenticated()) {
            return <Welcome />
          }
          return <Redirect to="/" />
        }} />

        <Route exact path="/quiz" render={props => {
          return <Quiz />
        }} />

        <Route exact path="/stats" render={props => {
          return <Stats />
        }} />

        <Route exact path="/create" render={props => {
          return <Create />
        }} />

      </Switch>
    )

  }
}

export default App;