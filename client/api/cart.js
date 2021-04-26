import axios from 'axios'

const url = '/api/carts'

export const createCart = (cart) => axios.post(url, cart)

export const getCart = (cartId) => axios.get(`${url}/${cartId}`)

export const addToCart = (product, cartId) => axios.post(`${url}/${cartId}/products`, product)

export const changeQuantity = (product, cartId) => axios.put(`${url}/${cartId}/products`, product)

export const deleteProduct = (productId, cartId) =>
  axios.delete(`${url}/${cartId}/products`, { data: { productId } })
