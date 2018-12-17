import React from 'react'
import PropTypes from 'prop-types'
import { autobind } from 'core-decorators'
import Modal, { ModalTransition } from '@atlaskit/modal-dialog'

export default
@autobind
class ChangePassword extends React.PureComponent {
  static propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func
  }
  render () {
    return (
      <ModalTransition>
        {this.props.isOpen && (
          <Modal
            actions={[{ text: 'Close', onClick: this.props.onClose }]}
            onClose={this.props.onClose}
            heading='Update password'
          >
            Change password
          </Modal>
        )}
      </ModalTransition>
    )
  }
}
