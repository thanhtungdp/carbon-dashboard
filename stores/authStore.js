import { observable, action, computed } from 'mobx'
// import axios from 'axios'

const url = 'https://api.tungtung.co'
// const origin = 'vietan'

class AuthTungtungStore {
  @observable loadingState = {
    isFetchingMe: true,
    isLoginLoading: false
  }

  @observable errors = undefined

  @observable values = {
    email: 't',
    password: ''
  }

  @action setEmail (email) {
    this.values.email = email
  }

  @action setPassword (password) {
    this.values.password = password
  }

  @action reset () {
    this.values.email = ''
    this.values.password = ''
  }

  @action async login () {
    const res = axios.post(url + '/auth/login', this.values, {
      headers: {
        origin: 'vietan.tungtung.co'
      }
    })
    console.log(res.data)
  }

  // @computed tung () {
  //   return 'thanhtungdp'
  // }
}

export default AuthTungtungStore
