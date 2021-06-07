export const getCookies = (title, cookie) => {
  let cookies

  if (typeof window !== 'undefined') {
    cookies = document.cookie.split('; ')
  } else {
    cookies = cookie.split('; ')
  }

  const currentCookie = cookies.find((el) => el.startsWith(title + '='))

  if (currentCookie) {
    const [cookieName, cookieValue] = currentCookie.split('=')

    return cookieValue
  }
}
