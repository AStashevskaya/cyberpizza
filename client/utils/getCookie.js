export const getCookies = (cookie) => {
  const arr = document.cookie.split('; ')
  const currentCookie = arr.find((el) => el.startsWith(cookie))
  let arr1 = currentCookie ? currentCookie.split('=') : []
  const cookieValue = arr1.find((el) => !el.startsWith(cookie))
  return cookieValue
}

export const getUserToken = () => {
  const arr = document.cookie.split('; ')
  const token = arr.find((el) => el.startsWith('jwt'))
  let arr1 = token ? token.split('=') : []
  const id = arr1.find((el) => !el.startsWith('jwt'))
  return id
}
