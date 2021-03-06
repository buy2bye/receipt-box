import nookies, {
  destroyCookie,
  parseCookies,
  setCookie as sSetCookie,
} from 'nookies'

const isBrowser = typeof window !== 'undefined'

export const setCookie = (key, value, ctx) => {
  const setFn = isBrowser ? sSetCookie : nookies.set
  setFn(ctx, key, value, {
    path: '/',
    maxAge: 365 * 24 * 60 * 60  // 1 years
  })
}

export const getCookie = (key, ctx) => {
  const getFn = isBrowser ? parseCookies : nookies.get
  const cookies = getFn(ctx)
  return cookies[key]
}

export const removeCookie = (key, ctx) => {
  destroyCookie(ctx, key, { path: '/' })
}
