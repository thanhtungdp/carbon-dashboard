const nextRoutes = require('next-routes')
const Link = require('next/link')

const routes = (module.exports = nextRoutes({
  Link: props => {
    const {
      as,
      href,
      prefetch,
      shallow,
      passHref,
      children,
      scroll,
      replace,
      route,
      params
    } = props
    return Link({
      as,
      href,
      prefetch,
      shallow,
      children,
      scroll,
      replace,
      passHref,
      route,
      params
    })
  }
}))

routes.add('blog', '/blog/:slug')
