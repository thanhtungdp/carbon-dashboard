import cookie from 'cookie'

export const cookieOptions = {
  sameSite: 'lax',
  path: '/',
  maxAge: 30 * 24 * 60 * 60 // 30 days
}

function parseCookies (req, options = cookieOptions) {
  return cookie.parse(req ? req.headers.cookie || '' : document.cookie, options)
}

export function saveCookie (key, value, options = cookieOptions) {
  document.cookie = cookie.serialize(key, value, options)
}

export default {
  get: (key, req, options = cookieOptions) => parseCookies(req, options)[key],
  save: (key, value, options = cookieOptions) => saveCookie(key, value, options)
}
