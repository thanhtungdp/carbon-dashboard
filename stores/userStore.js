import ResfulStore from './resfulStore'
import { action } from 'mobx'
import UserApi from 'api/UserApi'

export default class UserStore extends ResfulStore {
  model = 'users'
  searchKeys = ['username', 'email', 'fullname']

  @action
  async updatePassword (_id, data) {
    const { data: user, error } = await UserApi.updatePassword(_id, data)
    if (error) {
      this.error.updatePassword = user.messsge
      return false
    }
    const userIndex = this.list.data.findIndex(u => u._id === _id)
    if (userIndex > -1) {
      this.list.data[userIndex] = user
      this.error.updatePassword = null
    }
    return user
  }
}
