import React from 'react'
import TextInput from 'carbon-components-react/lib/components/TextInput'
import Button from 'carbon-components-react/lib/components/Button'
import styled from 'styled-components'

const Box = styled.div`
  background-color: #fafbfb;
  margin-left: auto;
  margin-right: auto;
  width: 400px;
  margin-top: 64px;
  padding: 24px 32px;
  .clearfix {
    height: 16px;
  }
`

export default class Login extends React.PureComponent {
  render () {
    return (
      <Box>
        <h2>Tungtung Admin Platform</h2>
        <div className='clearfix' />
        <TextInput labelText='Username' />
        <div className='clearfix' />
        <TextInput labelText='Password' />
        <div className='clearfix' />
        <Button fill>Login</Button>
      </Box>
    )
  }
}
