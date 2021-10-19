import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { Provider } from 'react-redux'
import { hot } from 'react-hot-loader/root'

import store from './redux/store'
import ROUTES from './routes'

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <Router>
          <Switch>
            {ROUTES.map((route) => (
              <Route exact {...route} key={route.path} />
            ))}
            {/* <Redirect to="/" /> */}
          </Switch>
        </Router>
      </div>
    </Provider>
  )
}

export default hot(App)
