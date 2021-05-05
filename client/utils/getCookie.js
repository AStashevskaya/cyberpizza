const getCookies = () => {
  const arr = document.cookie.split('; ')
  const cart_id = arr.find((el) => el.startsWith('cart_id10'))
  let arr1 = cart_id ? cart_id.split('=') : []
  const id = arr1.find((el) => !el.startsWith('cart_id10'))
  return id
}

export default getCookies
