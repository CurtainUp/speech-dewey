// Root of Speech Dewey

import React from 'react'
import ReactDOM from 'react-dom'
import Dewey from './components/Dewey'
import './index.scss'
import { BrowserRouter as Router } from 'react-router-dom'


ReactDOM.render(<Router><Dewey /></Router>, document.getElementById('root'))
