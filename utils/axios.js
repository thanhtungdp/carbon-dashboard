import axios from 'axios'
// import { getToken } from './auth'

global.headers = {
  Accept: 'application/json'
}
// global.authToken = ''

// export function setGlobalAuthToken (authToken) {
//   if (authToken) {
//     global.authToken = authToken
//   }
// }

// export function setGlobalHeaders (headers) {
//   if (headers) {
//     global.headers = {
//       ...global.headers,
//       ...headers
//     }
//   }
// }

export const getHeaders = authToken => {
  // const currentToken = process.browser ? getToken() : authToken
  // setGlobalAuthToken(currentToken)
  global.headers = {
    ...global.headers
    // Authorization: global.authToken
  }
  return global.headers
}

const getAttributes = (props = {}) => ({
  cache: true,
  headers: getHeaders(),
  ...props
})

const customAxios = func => (url, ...args) => {
  return new Promise((resolve, reject) => {
    func(url, ...args)
      .then(({ data, status }) => {
        resolve({ data, status, success: true })
      })
      .catch(e => {
        if (e.response) {
          const { data, status } = e.response
          resolve({ data, status, error: true })
        } else {
          reject(e)
        }
      })
  })
}

export default {
  get: (url, args = {}) => {
    return customAxios(axios.get)(url, getAttributes(args))
  },
  post: (url, data, args = {}) =>
    customAxios(axios.post)(url, data, getAttributes(args)),
  put: (url, data, args) =>
    customAxios(axios.put)(url, data, getAttributes(args)),
  delete: (url, args) => customAxios(axios.delete)(url, getAttributes(args))
}
