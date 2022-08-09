import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { hot } from 'react-hot-loader/root'
import { builder, Builder, BuilderContent } from '@builder.io/react'
import CatchallPage from './pages/[...page]'

import store from './redux/store'
import ROUTES from './routes'
import config from '../config'

builder.init(config.apiKey)

import './components/Card/Card.builder'

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          {ROUTES.map((route) => (
            <Route exact {...route} key={route.path} />
          ))}
          <Route
            render={({ location }) => <CatchallPage key={location.key} location={location} />}
          />
          {/* <Redirect to="/" /> */}
        </Switch>
      </Router>
    </Provider>
  )
}

export default hot(App)
