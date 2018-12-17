import React from 'react'
import TextInput from 'carbon-components-react/lib/components/TextInput'
import Button from 'carbon-components-react/lib/components/Button'
import InlineLoading from 'carbon-components-react/lib/components/InlineLoading'
import styled from 'styled-components'
import { observer, inject } from 'mobx-react'
import createInput from 'hoc/create-input'
import { autobind } from 'core-decorators'
import redirect from 'utils/redirect'
import LoginFormMobx from './LoginFormMobx'

const FTextInput = createInput({ Component: TextInput })

const Box = styled.form`
  background-color: #fafbfb;
  margin-left: auto;
  margin-right: auto;
  width: 400px;
  margin-top: 64px;
  padding: 24px 32px;
  .clearfix {
    height: 16px;
  }
  .bx--btn {
    width: 100%;
  }
`

export default
@inject('authStore')
@observer
@autobind
class Login extends React.Component {
  constructor (props) {
    super(props)
    this.form = new LoginFormMobx()
  }

  async onSuccess (form) {
    const isAuthenticated = await this.props.authStore.login(form.values())
    if (isAuthenticated) {
      redirect({}, '/login')
    } else {
      this.form.$('email').invalidate(this.props.authStore.errors.login)
    }
  }

  handleSubmit (e) {
    return this.form.onSubmit(e, {
      onSuccess: this.onSuccess
    })
  }

  render () {
    return (
      <Box onSubmit={this.handleSubmit}>
        <h2>Tungtung Admin Platform</h2>
        <div className='clearfix' />
        <FTextInput labelText='Email' field={this.form.$('email')} />
        <FTextInput
          type='password'
          labelText='Password'
          field={this.form.$('password')}
        />
        <div className='clearfix' />
        {this.props.authStore.loadingState.isLoginLoading ? (
          <InlineLoading description={'Submitting...'} />
        ) : (
          <Button type='submit'>Login</Button>
        )}
      </Box>
    )
  }
}
