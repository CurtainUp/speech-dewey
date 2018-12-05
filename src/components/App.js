import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import Landing from './start/Landing'
import Welcome from './start/Welcome'


class App extends Component {
  isAuthenticated = () => sessionStorage.getItem("id") !== null

  render() {
    return (
      <Switch>

        <Route exact path="/" render={(props) => {
          if (this.isAuthenticated()) {
            return <Redirect to="/welcome" />
          }
          return <Landing {...props}/>
        }} />

        <Route exact path="/welcome" render={props => {
          if (this.isAuthenticated()) {
            return <Welcome />
          }
          return <Redirect to="/" />
        }} />

      </Switch>
    )

  }
}

export default App;