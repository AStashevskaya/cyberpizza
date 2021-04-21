import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { hot } from 'react-hot-loader/root'

import store from './redux/store'
import CatalogPage from './pages/catalog'

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <Router>
          <Switch>
            <Route exact path="/" component={CatalogPage} />
          </Switch>
        </Router>
      </div>
    </Provider>
  )
}

export default hot(App)
