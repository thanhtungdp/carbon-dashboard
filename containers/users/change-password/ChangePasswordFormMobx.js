import validatorjs from 'validatorjs'
import { Form } from 'mobx-react-form'

export default class ChangePasswordMobxForm extends Form {
  plugins () {
    return { dvr: validatorjs }
  }

  setup () {
    return {
      fields: [
        {
          name: 'password',
          label: 'Password',
          placeholder: 'New Password',
          rules: 'required|string|between:5,25'
        }
      ]
    }
  }
}
