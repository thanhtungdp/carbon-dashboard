import React from 'react'
import Link from 'next/link'

export default class LinkCustom extends React.PureComponent {
  render () {
    const {
      as,
      href,
      prefetch,
      shallow,
      passHref,
      children,
      scroll,
      ref
    } = this.props
    const newProps = {
      as,
      href,
      prefetch,
      shallow,
      passHref,
      children,
      scroll,
      ref
    }
    return <Link {...newProps} />
  }
}
