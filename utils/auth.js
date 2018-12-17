import cookie from './cookie'

const AUTH_TOKEN = 'authToken'

export function saveToken (token) {
  cookie.save(AUTH_TOKEN, token)
}

export function getToken (req) {
  return cookie.get(AUTH_TOKEN, req)
}

export function logout (isRedirect = true) {
  saveToken('')
  if (isRedirect) {
    window.location = '/login'
  }
}
