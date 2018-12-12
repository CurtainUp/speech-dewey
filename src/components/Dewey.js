import React, { Component } from "react"
import App from "./App"
import NavBar from "./NavBar"

export default class Dewey extends Component {

  render() {
      return (
          <React.Fragment>
              <NavBar />
              <App />
          </React.Fragment>
      )
  }
}