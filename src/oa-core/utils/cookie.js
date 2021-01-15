import Cookie from 'js-cookie'

const TOKEN_NAME = 'oa-token'

export const getAuthToken = () => {
  // return 'O2M_SW3KR0DNGqgx1xE7Plh9UevuRn6o'
  return Cookie.get(TOKEN_NAME)
}

export const setAuthToken = token => {
  Cookie.set(TOKEN_NAME, token, { expires: 7 })
}

export const removeAuthToken = () => {
  Cookie.remove(TOKEN_NAME)
}
