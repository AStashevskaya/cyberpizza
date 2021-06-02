import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { Provider } from 'react-redux'
import { hot } from 'react-hot-loader/root'

import store from './redux/store'

import CatalogPage from './pages/catalog'
import LoginPage from './pages/LoginPage'
import SignInPage from './pages/SigninPage'

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <Router>
          <Switch>
            <Route exact path="/" component={CatalogPage} />
            <Route exact path="/log-in" component={LoginPage} />
            <Route exact path="/register" component={SignInPage} />
            <Redirect to="/" />
          </Switch>
        </Router>
      </div>
    </Provider>
  )
}

export default hot(App)
