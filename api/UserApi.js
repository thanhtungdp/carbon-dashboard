import { API_ADMIN } from 'config'
import axios from 'utils/axios'

function getUrl (path) {
  return API_ADMIN + '/api/v1/users' + path
}

export default {
  updatePassword: (_id, data) =>
    axios.put(getUrl(`/${_id}/update-password`), data)
}
