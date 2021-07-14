import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { hot } from 'react-hot-loader/root'
import ReactGA from 'react-ga'

import store from './redux/store'
import ROUTES from './routes'
import RoutesContainer from './RoutesContainer'

ReactGA.initialize('UA-202046657-1')
const App = () => {
  const { pathname } = window.location
  console.log('path', pathname)

  return (
    <Provider store={store}>
      <div>
        <Router>
          <Switch>
            <RoutesContainer />
            {/* {ROUTES.map((route) => (
              <Route exact {...route} key={route.path} />
            ))} */}
            {/* <Redirect to="/" /> */}
          </Switch>
        </Router>
      </div>
    </Provider>
  )
}

export default hot(App)
