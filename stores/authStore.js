import { observable, action } from 'mobx'
import AuthApi from 'api/AuthApi'
import { saveToken } from 'utils/auth'
import { autoInjectData } from './utils'

class AuthTungtungStore {
  @observable
  loadingState = {
    isFetchingMe: true,
    isLoginLoading: false
  }

  @observable isAuthenticated = false
  @observable token = null
  @observable me = null

  @observable
  errors = {
    login: null,
    me: null
  }

  constructor (isServer, initialData) {
    autoInjectData(this, initialData)
  }

  /**
   * Save to local
   */
  @action
  saveToken (token) {
    saveToken(token)
    this.token = token
  }

  /**
   * Fetch user first login
   */
  @action
  async fetchMe (authToken) {
    this.loadingState.isFetchingMe = true
    const { data, error } = await AuthApi.me()
    if (error) {
      this.errors.me = data.message
      this.loadingState.isFetchingMe = false
      return false
    } else {
      this.errors.me = null
      this.me = data
      this.token = authToken
      this.isAuthenticated = true
      this.loadingState.isFetchingMe = false
      return this.me
    }
  }

  /**
   * Login for user data
   */
  @action
  async login ({ email, password }) {
    this.loadingState.isLoginLoading = true
    const { data, error } = await AuthApi.login({ email, password })
    if (error) {
      this.errors.login = data.message
    } else {
      this.me = data.user
      this.saveToken(data.token)
      this.errors.login = null
      this.errors.me = null
      this.isAuthenticated = true
    }
    this.loadingState.isLoginLoading = false
    return data.user
  }

  // @computed tung () {
  //   return 'thanhtungdp'
  // }
}

export default AuthTungtungStore
