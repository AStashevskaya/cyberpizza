import axios from 'axios'

const url = '/api/carts'

export const createCart = (cart) => axios.post(url, cart)

export const getCarts = () => axios.get(url)

export const getCart = (cartId) => axios.get(`${url}/${cartId}`)

export const addToCart = (productId, cartId) => axios.post(`${url}/${cartId}/products`, productId)

export const changeQuantity = (product, cartId) => axios.put(`${url}/${cartId}/products`, product)

export const deleteProduct = (productId, cartId) =>
  axios.delete(`${url}/${cartId}/products`, { data: { productId } })

export const clearCart = (cartId) => axios.put(`${url}/${cartId}`)
