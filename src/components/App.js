import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Landing from './start/Landing'
import Welcome from './start/Welcome'
import Stats from './stats/Stats'
import Quiz from './quiz/Quiz'
import CardDash from './create/CardDash'
import YourCards from './create/YourCards'
import QuizDifficulty from './quiz/QuizDifficulty'

class App extends Component {
  state = {
    foodcategory: 1,
    moodcategory: 2,
    homecategory: 3,
    peoplecategory: 4,
    difficulty: "",
    activeToday: false,
    user: null,
    navText: ""
  }

  handleLoginChange = (userid) => {
    return this.setState({ user: userid })
  }

  // Passed to QuizDifficulty to set difficulty before quiz begins
  handleDifficultyChange = (level) => {
    return this.setState({ difficulty: level })
  }

  handleActivityChange = (boo) => {
    return this.setState({ activeToday: boo })
  }

  handleNavText = (text) => {
    return new Promise((resolve) => {
      this.setState({ navText: text }, () => resolve())
    })
  }

  // Checks if a user is currently logged in
  isAuthenticated = () => sessionStorage.getItem("id") !== null

  render() {
    return (
      <Switch>

        <Route exact path="/" render={(props) => {
          if (this.isAuthenticated()) {
            return <Redirect to="/welcome" />
          }
          return <Landing {...props} handleLoginChange={this.handleLoginChange} />
        }} />

        <Route exact path="/welcome" render={props => {
          if (this.isAuthenticated()) {
            return <Welcome
              handleNavText={this.handleNavText}
              navText={this.state.navText} />
          }
          return <Redirect to="/" />
        }} />

        <Route exact path="/quiz-select" render={props => {
          return <QuizDifficulty
            onDifficultyChange={this.handleDifficultyChange}
            difficulty={this.state.difficulty}
            handleNavText={this.handleNavText}
            navText={this.state.navText} />
        }} />

        <Route exact path="/food-quiz" render={props => {
          // if (this.state.difficulty === "easy") {
            return <Quiz className="full-height" category={this.state.foodcategory} difficulty={this.state.difficulty} resetDifficulty={this.handleDifficultyChange} />
        }} />


        <Route exact path="/mood-quiz" render={props => {
            return <Quiz className="full-height" category={this.state.moodcategory} difficulty={this.state.difficulty} resetDifficulty={this.handleDifficultyChange} />
        }} />

        <Route exact path="/home-quiz" render={props => {
            return <Quiz className="full-height" category={this.state.homecategory} difficulty={this.state.difficulty} resetDifficulty={this.handleDifficultyChange} />
        }} />

        <Route exact path="/people-quiz" render={props => {
            return <Quiz category={this.state.peoplecategory} difficulty={this.state.difficulty} resetDifficulty={this.handleDifficultyChange} />
        }} />

        <Route exact path="/stats" render={props => {
          return <Stats activeToday={this.state.activeToday} resetActivity={this.handleActivityChange} handleNavText={this.handleNavText} navText={this.state.navText} />
        }} />

        <Route exact path="/cards" render={props => {
          return <CardDash handleNavText={this.handleNavText} navText={this.state.navText} />
        }} />

        <Route exact path="/your-cards" render={props => {
          return <YourCards handleNavText={this.handleNavText} navText={this.state.navText} />
        }} />

      </Switch>
    )

  }
}

export default App