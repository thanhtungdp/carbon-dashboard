import App, { Container } from 'next/app'
import React from 'react'
import { Provider } from 'mobx-react'
import '../styles/style.scss'

import { initializeStores } from '../stores'

class MyMobxApp extends App {
  static async getInitialProps (appContext) {
    // Get or Create the store with `undefined` as initialState
    // This allows you to set a custom default initialState
    const mobxStores = initializeStores()
    // Provide the store to getInitialProps of pages
    appContext.ctx.mobxStores = mobxStores

    let appProps = await App.getInitialProps(appContext)

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
      : initializeStores(props.initialMobxState)
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
