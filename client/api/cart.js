import axios from 'axios'

const url = '/api/carts'
const name = window.btoa('nastya:123')
const auth = 'Basic ' + name

export const createCart = (cart) => axios.post(url, cart)

export const getCarts = () =>
  axios.get(url, {
    headers: {
      Authorization: auth,
    },
  })

export const getCart = (cartId) => axios.get(`${url}/${cartId}`)

export const addToCart = (product, cartId) =>
  axios.post(`${url}/${cartId}/products`, product, {
    headers: {
      Authorization: auth,
    },
  })

export const changeQuantity = (product, cartId) => axios.put(`${url}/${cartId}/products`, product)

export const deleteProduct = (productId, cartId) =>
  axios.delete(`${url}/${cartId}/products`, { data: { productId } })
