export const encode = obj => {
  if (typeof obj !== 'object') {
    throw new Error(`[name-crypto] should provice object but got ${typeof obj}`)
  }
  const one = JSON.stringify(obj)
  const two = encodeURIComponent(one)
  const three = btoa(two)
  return three
}

export const decode = str => {
  const one = atob(unescape(str))
  const two = decodeURIComponent(one)
  const three = JSON.parse(two)
  return three
}
