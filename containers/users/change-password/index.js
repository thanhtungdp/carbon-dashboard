import React from 'react'
import PropTypes from 'prop-types'
import { autobind } from 'core-decorators'
import { inject, observer } from 'mobx-react'
import TextInput from 'carbon-components-react/lib/components/TextInput'
import Modal, { ModalTransition } from '@atlaskit/modal-dialog'
import ChangePasswordFormMobx from './ChangePasswordFormMobx'
import createInput from 'hoc/create-input'
import swal from 'sweetalert2'

const FTextInput = createInput({ Component: TextInput })

export default
@inject('userStore')
@observer
@autobind
class ChangePassword extends React.Component {
  static propTypes = {
    userId: PropTypes.string.isRequired,
    isOpen: PropTypes.bool,
    onSubmit: PropTypes.func,
    onClose: PropTypes.func
  }

  constructor (props) {
    super(props)
    this.form = new ChangePasswordFormMobx()
  }

  async handleSubmit (form) {
    const isUpdated = await this.props.userStore.updatePassword(
      this.props.userId,
      form.values()
    )
    if (isUpdated) {
      swal({
        type: 'success',
        title: 'Password updated'
      })
      this.props.onClose()
    } else {
      this.form
        .$('password')
        .invalidate(this.props.userStore.error.updatePassword)
    }
  }

  handleUpdatePassword (e) {
    return this.form.onSubmit(e, {
      onSuccess: this.handleSubmit
    })
  }

  render () {
    return (
      <ModalTransition>
        {this.props.isOpen && (
          <Modal
            actions={[
              { text: 'Update', onClick: this.handleUpdatePassword },
              { text: 'Close', onClick: this.props.onClose }
            ]}
            onClose={this.props.onClose}
            heading='Update password'
          >
            <FTextInput
              labelText={'New password'}
              field={this.form.$('password')}
            />
          </Modal>
        )}
      </ModalTransition>
    )
  }
}
