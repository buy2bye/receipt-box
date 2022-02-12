
export const redirect = (url, ctx) => {
  if (typeof window === 'undefined') {
    // is server side rnedered
    ctx.res.writeHead(302, { Location: url })
    ctx.res.end()
  } else {
    Router.push(url)
  }
  return {}
}
