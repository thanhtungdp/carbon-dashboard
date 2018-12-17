import validatorjs from 'validatorjs'
import { Form } from 'mobx-react-form'

export default class FormLoginMobxClass extends Form {
  plugins () {
    return { dvr: validatorjs }
  }

  setup () {
    return {
      fields: [
        {
          name: 'email',
          label: 'Email',
          placeholder: 'Insert Email',
          rules: 'required|email|string|between:5,25'
        },
        {
          name: 'password',
          label: 'Password',
          placeholder: 'Insert Password',
          rules: 'required|string|between:5,25'
        }
      ]
    }
  }
}
