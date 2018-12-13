import ResfulStore from './resfulStore'

export default class TestStore extends ResfulStore {
  model = 'tests'
  searchKeys = ['title', 'description']
}
