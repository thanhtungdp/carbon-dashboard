import React from 'react'
import redirect from 'utils/redirect'

const hocProtectLogin = Component => {
  return class hocProtectLogin extends React.Component {
    static async getInitialProps (appContext) {
      const isAuthenticated = appContext.mobxStores.authStore.isAuthenticated
      console.log(isAuthenticated)
      if (isAuthenticated) {
        if (!process.browser) {
          redirect(appContext, '/')
        } else {
          redirect({}, '/')
        }
      }
      let appProps = !Component.getInitialProps
        ? {}
        : await Component.getInitialProps(appContext)
      return appProps
    }
    render () {
      return <Component {...this.props} />
    }
  }
}

export default hocProtectLogin
