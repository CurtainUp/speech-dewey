import React, { Component } from 'react'
import { Button } from 'reactstrap'


export default class Speak extends Component {
  state = {
    voice: 0
  }

  speak = (word) => {
    let synth = window.speechSynthesis

    if (synth.speaking) {
        console.error('speechSynthesis.speaking');
        return;
    }
    if (word !== '') {
    let utterThis = new SpeechSynthesisUtterance(word);
    utterThis.voice = synth.getVoices()[3]
    utterThis.onend = function (event) {
        console.log('SpeechSynthesisUtterance.onend');
    }
    utterThis.onerror = function (event) {
        console.error('SpeechSynthesisUtterance.onerror');
    }
    synth.speak(utterThis);
  }
}

handleClick = (e) => {
  console.log("clicked")
  this.speak(this.props.word)
  console.log("talking")
}

componentDidMount = () => {
  let synth = window.speechSynthesis
  let voice = synth.getVoices()
  voice = voice[3]
  this.setState({ voice : voice })
}

render () {
  return <Button onClick={(e) => {this.handleClick(e)}}>Play</Button>
}

}