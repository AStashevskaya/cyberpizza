import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { Provider } from 'react-redux'
import { hot } from 'react-hot-loader/root'
import { builder, Builder, BuilderContent } from '@builder.io/react'
import Page from './pages/[...page]'

import store from './redux/store'
import ROUTES from './routes'
import config from '../config'
// import { fetchContent } from './content'

builder.init(config.apiKey)
const Noop = ({ children }) => <>{children}</>

const App = ({ Component, pageProps }) => {
  const [content, setContent] = useState(null)

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const pages = await builder.getAll('page', {
          options: { noTargeting: true },
          apiKey: config.apiKey,
        })
        const [pagecontent] = pages
        setContent(pagecontent)
      } catch (error) {
        console.log('rrr', error)
      }
    }
    fetchContent()
  }, [])

  console.log('content', content)
  console.log('start app')

  const Layout = (Component && Component.Layout) || Noop
  console.log('comp', Component, pageProps)
  return (
    <Provider store={store}>
      <div>
        <Layout pageProps={pageProps}>
          <Page {...pageProps} page={content} />
        </Layout>
      </div>
    </Provider>
  )
}

// ;<Router>
//   <Switch>
//     {ROUTES.map((route) => (
//       <Route exact {...route} key={route.path} />
//     ))}
//     {/* <Redirect to="/" /> */}
//   </Switch>
// </Router>

export default hot(App)
