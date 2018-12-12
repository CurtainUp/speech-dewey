import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import Landing from './start/Landing'
import Welcome from './start/Welcome'
import QuizSelect from './quiz/QuizSelect'
import Stats from './stats/Stats'
import Quiz from './quiz/Quiz'
import CardDash from './create/CardDash';
import Create from './create/Create';
import YourCards from './create/YourCards';
import QuizDifficulty from './quiz/QuizDifficulty'

class App extends Component {
  state = {
    foodcategory: 1,
    moodcategory: 2,
    homecategory: 3,
    peoplecategory: 4,
    difficulty: ""
  }

  handleDifficultyChange = (level) => {
    return this.setState({ difficulty: level })
  }

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

        {/* <Route exact path="/quiz" render={props => {
          return <Quiz />
        }} /> */}

        <Route exact path="/food-quiz" render={props => {
          return <Quiz category={this.state.foodcategory} difficulty={this.state.difficulty} />
        }} />

        <Route exact path="/mood-quiz" render={props => {
          return <Quiz category={this.state.moodcategory} difficulty={this.state.difficulty} />
        }} />

        <Route exact path="/home-quiz" render={props => {
          return <Quiz category={this.state.homecategory} difficulty={this.state.difficulty} />
        }} />

        <Route exact path="/people-quiz" render={props => {
          return <Quiz category={this.state.peoplecategory} difficulty={this.state.difficulty} />
        }} />

        <Route exact path="/stats" render={props => {
          return <Stats />
        }} />

        <Route exact path="/cards" render={props => {
          return <CardDash />
        }} />

        <Route exact path="/create" render={props => {
          return <Create />
        }} />

        <Route exact path="/your-cards" render={props => {
          return <YourCards />
        }} />

      </Switch>
    )

  }
}

export default App;