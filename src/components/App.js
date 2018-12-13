import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import Landing from './start/Landing'
import Welcome from './start/Welcome'
import Stats from './stats/Stats'
import EasyQuiz from './quiz/EasyQuiz'
import MediumQuiz from './quiz/MediumQuiz'
import CardDash from './create/CardDash';
import YourCards from './create/YourCards';
import QuizDifficulty from './quiz/QuizDifficulty'

class App extends Component {
  state = {
    foodcategory: 1,
    moodcategory: 2,
    homecategory: 3,
    peoplecategory: 4,
    difficulty: "",
    activeToday: false
  }

  // Passed to QuizDifficulty to set difficulty before quiz begins
  handleDifficultyChange = (level) => {
    return this.setState({ difficulty: level })
  }

  handleActivityChange = (boo) => {
    return this.setState({ activeToday: boo })
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
          return <Landing {...props} />
        }} />

        <Route exact path="/welcome" render={props => {
          if (this.isAuthenticated()) {
            return <Welcome />
          }
          return <Redirect to="/" />
        }} />

        <Route exact path="/quiz-select" render={props => {
          return <QuizDifficulty
            onDifficultyChange={this.handleDifficultyChange}
            difficulty={this.state.difficulty} />
        }} />

        <Route exact path="/food-quiz" render={props => {
          if (this.state.difficulty === "easy") {
            return <EasyQuiz category={this.state.foodcategory} difficulty={this.state.difficulty} resetDifficulty={this.handleDifficultyChange} />
          } else return <MediumQuiz category={this.state.foodcategory} difficulty={this.state.difficulty} resetDifficulty={this.handleDifficultyChange} />
        }} />


        <Route exact path="/mood-quiz" render={props => {
          if (this.state.difficulty === "easy") {
            return <EasyQuiz category={this.state.moodcategory} difficulty={this.state.difficulty} resetDifficulty={this.handleDifficultyChange} />
          } else return <MediumQuiz category={this.state.moodcategory} difficulty={this.state.difficulty} resetDifficulty={this.handleDifficultyChange} />
        }} />

        <Route exact path="/home-quiz" render={props => {
          if (this.state.difficulty === "easy") {
            return <EasyQuiz category={this.state.homecategory} difficulty={this.state.difficulty} resetDifficulty={this.handleDifficultyChange} />
          } else return <MediumQuiz category={this.state.homecategory} difficulty={this.state.difficulty} resetDifficulty={this.handleDifficultyChange} />
        }} />

        <Route exact path="/people-quiz" render={props => {
          if (this.state.difficulty === "easy") {
            return <EasyQuiz category={this.state.peoplecategory} difficulty={this.state.difficulty} resetDifficulty={this.handleDifficultyChange} />
          } else return <MediumQuiz category={this.state.peoplecategory} difficulty={this.state.difficulty} resetDifficulty={this.handleDifficultyChange} />
        }} />

        <Route exact path="/stats" render={props => {
          return <Stats activeToday={this.state.activeToday} resetActivity={this.handleActivityChange} />
        }} />

        <Route exact path="/cards" render={props => {
          return <CardDash />
        }} />

        <Route exact path="/your-cards" render={props => {
          return <YourCards />
        }} />

      </Switch>
    )

  }
}

export default App;