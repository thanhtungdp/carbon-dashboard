import Link from 'next/link'
import { Notification16, User16 } from '@carbon/icons-react'
import {
  Header,
  HeaderName,
  HeaderNavigation,
  HeaderMenu,
  HeaderMenuItem,
  HeaderGlobalBar,
  HeaderGlobalAction
} from 'carbon-components-react/lib/components/UIShell'
// import Link from '../routes'

import styled from 'styled-components'

const Logo = styled.img`
  height: 30px;
  margin-left: 16px;
`

export default props => (
  <div className='example'>
    <Header aria-label='Header'>
      <Logo src='/static/logo.svg' />
      <HeaderName href='#' prefix='Admin'>
        Platform
      </HeaderName>
      <HeaderNavigation aria-label='IBM [Platform]'>
        <Link href='/'>
          <HeaderMenuItem href='/'>Users</HeaderMenuItem>
        </Link>
        <Link href='/test'>
          <HeaderMenuItem href='#'>Tests</HeaderMenuItem>
        </Link>
        <HeaderMenuItem href='#'>Playlist</HeaderMenuItem>
        <HeaderMenu aria-label='Catalog'>
          <HeaderMenuItem href='#'>Category</HeaderMenuItem>
          <HeaderMenuItem href='#'>Tags</HeaderMenuItem>
        </HeaderMenu>
      </HeaderNavigation>
      <HeaderGlobalBar>
        <HeaderGlobalAction aria-label='Notifications'>
          <Notification16 />
        </HeaderGlobalAction>
        <HeaderGlobalAction aria-label='Profile'>
          <User16 />
        </HeaderGlobalAction>
      </HeaderGlobalBar>
    </Header>
    <div style={{ marginTop: 32, padding: 24 }}>{props.children}</div>
  </div>
)
