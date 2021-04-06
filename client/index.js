import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'

import './styles/main.scss'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
