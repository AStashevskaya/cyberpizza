export const getCookies = (cookie) => {
  const arr = document.cookie.split('; ')
  const currentCookie = arr.find((el) => el.startsWith(cookie + '='))

  if (currentCookie) {
    const [cookieName, cookieValue] = currentCookie.split('=')

    return cookieValue
  }
}
