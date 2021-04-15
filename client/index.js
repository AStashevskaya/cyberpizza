import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'

import 'normalize.css'
import './styles/main.scss'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
