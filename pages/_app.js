import App, { Container } from 'next/app'
import React from 'react'
import Router from 'next/router'
import { Provider } from 'mobx-react'
import NProgress from 'nprogress'
import { setGlobalHeaders, setGlobalAuthToken } from 'utils/axios'
import { getToken } from 'utils/auth'

import '../styles/style.scss'

import { initializeStores } from '../stores'

Router.onRouteChangeStart = url => {
  console.log('start')
  NProgress.start()
}
Router.onRouteChangeComplete = () => {
  NProgress.done()
}
Router.onRouteChangeError = () => NProgress.done()

class MyMobxApp extends App {
  static async getInitialProps (appContext) {
    const mobxStores = initializeStores()
    const isAuthenticated = mobxStores.authStore.isAuthenticated
    if (!process.browser) {
      const { host, ...headers } = appContext.ctx.req.headers
      setGlobalHeaders({ headers, origin: host })
    }
    if (!process.browser && !isAuthenticated) {
      const authToken = getToken(appContext.ctx.req)
      if (authToken) {
        setGlobalAuthToken(authToken)
        await mobxStores.authStore.fetchMe(authToken)
      }
    }
    appContext.ctx.mobxStores = mobxStores
    appContext.ctx.isAuthenticated = mobxStores.authStore.isAuthenticated
    let appProps = {}
    if (App.getInitialProps) {
      appProps = await App.getInitialProps(appContext)
    }
    return {
      ...appProps,
      initialMobxStores: mobxStores
    }
  }

  constructor (props) {
    super(props)
    const isServer = typeof window === 'undefined'
    this.mobxStores = isServer
      ? props.initialMobxStores
      : initializeStores(props.initialMobxStores)
  }

  render () {
    const { Component, pageProps } = this.props
    return (
      <Container>
        <Provider {...this.mobxStores}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    )
  }
}
export default MyMobxApp
