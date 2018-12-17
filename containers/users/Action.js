import React from 'react'
import PropTypes from 'prop-types'
import EditorBulletListIcon from '@atlaskit/icon/glyph/editor/bullet-list'
import LockIcon from '@atlaskit/icon/glyph/lock'
import AppAccessIcon from '@atlaskit/icon/glyph/app-access'
import Tooltip from '@atlaskit/tooltip'
import styled from 'styled-components'
import { autobind } from 'core-decorators'
import ChangePassword from './change-password'

const ActionList = styled.div`
  display: flex;
  margin-left: -8px;
  margin-right: -8px;
  .item {
    padding: 0px 8px;
  }
`

const Item = styled.a`
  :hover {
    cursor: pointer;
  }
`

export default
@autobind
class Action extends React.PureComponent {
  static propTypes = {
    userId: PropTypes.string.isRequired
  }

  state = {
    isChangePassword: false
  }

  toggleChangePassword () {
    this.setState({ isChangePassword: !this.state.isChangePassword })
  }

  render () {
    return (
      <ActionList>
        <Tooltip content='change password'>
          <Item onClick={this.toggleChangePassword} className='item'>
            <LockIcon />
          </Item>
        </Tooltip>
        <Tooltip content='Update information'>
          <Item className='item'>
            <AppAccessIcon />
          </Item>
        </Tooltip>
        <Tooltip content='Activiy log'>
          <Item className='item'>
            <EditorBulletListIcon />
          </Item>
        </Tooltip>
        <ChangePassword
          userId={this.props.userId}
          isOpen={this.state.isChangePassword}
          onClose={this.toggleChangePassword}
        />
      </ActionList>
    )
  }
}
