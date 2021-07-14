import React, { useEffect } from 'react'
import { pageview } from 'react-ga'
import { Route, withRouter } from 'react-router-dom'

import ROUTES from './routes'

const RoutesContainer = () => {
  useEffect(() => {
    console.log('from routea', window.location.pathname)
    pageview(window.location.pathname + window.location.search)
  })

  return (
    <>
      {ROUTES.map((route) => (
        <Route exact {...route} key={route.path} />
      ))}
      {/* <Redirect to="/" /> */}
    </>
  )
}

export default withRouter(RoutesContainer)
