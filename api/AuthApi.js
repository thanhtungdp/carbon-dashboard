import { API_ADMIN } from 'config'
import axios from 'utils/axios'

function getUrl (path) {
  return API_ADMIN + path
}

export default {
  login: data => axios.post(getUrl('/login'), data),
  me: () => axios.get(getUrl('/me'))
}
