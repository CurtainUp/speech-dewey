// Integration with Web Speech API for verbal reading of the current word.

import React, { Component } from 'react'
import { Button } from 'reactstrap'

export default class Speak extends Component {
  state = {
    voice: 0
  }

  speak = (word) => {
    let synth = window.speechSynthesis

    if (synth.speaking) {
        return;
    }
    if (word !== '') {
    let utterThis = new SpeechSynthesisUtterance(word);
    utterThis.voice = synth.getVoices()[3]
    utterThis.onend = function (event) {
    }
    utterThis.onerror = function (event) {
    }
    synth.speak(utterThis);
  }
}

handleClick = (e) => {
  this.speak(this.props.word)
}

componentDidMount = () => {
  let synth = window.speechSynthesis
  let voice = synth.getVoices()
  voice = voice[3]
  this.setState({ voice : voice })
}

render () {
  return <Button onClick={(e) => {this.handleClick(e)}}><i className="fas fa-volume-up form-icon center"></i></Button>
}

}