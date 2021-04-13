import React, { useEffect, useState } from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import { hot } from 'react-hot-loader/root'

import CatalogPage from './pages/catalog'

const App = () => {
  return (
    <div>
      <Router hashType="noslash">
        <Switch>
          <Route exact path="/" component={CatalogPage} />
        </Switch>
      </Router>
    </div>
  )
}

export default hot(App)
