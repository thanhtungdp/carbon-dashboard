import styled from 'styled-components'
import React from 'react'
import { observer } from 'mobx-react'

const FormGroup = styled.div`
  padding: 8px 0px;
`

const hocCreateInput = ({ Component, isFormItem = false }) => {
  @observer
  class Input extends React.Component {
    render () {
      const { field, type = 'text' } = this.props
      return (
        <FormGroup className={isFormItem ? 'bx--form-item' : ''}>
          <Component
            {...field.bind({
              type
            })}
            {...this.props}
            invalid={!!field.error}
            invalidText={field.error}
          />
        </FormGroup>
      )
    }
  }
  return Input
}

export default hocCreateInput
