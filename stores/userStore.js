import ResfulStore from './resfulStore'

export default class UserStore extends ResfulStore {
  model = 'users'
  searchKeys = ['username', 'email', 'fullname']
}
