export const getCookies = (cookie) => {
  const arr = document.cookie.split('; ')
  const currentCookie = arr.find((el) => el.startsWith(cookie))
  let arr1 = currentCookie ? currentCookie.split('=') : []
  const cookieValue = arr1.find((el) => !el.startsWith(cookie))
  return cookieValue
}
