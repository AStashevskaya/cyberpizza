import axios from 'axios'

const url = '/api/carts'

export const createCart = (cart) => axios.post(url, cart)
export const getCart = (id = '607ffefed115ba028025cf9b') => axios.get(`${url}/${id}`)
export const addToCart = (product, id = '607ffefed115ba028025cf9b') =>
  axios.post(`${url}/${id}/products`, product)
export const changeQuantity = (product, id = '607ffefed115ba028025cf9b') =>
  axios.put(`${url}/${id}/products`, product)
export const deleteProduct = (productId, id = '607ffefed115ba028025cf9b') =>
  axios.delete(`${url}/${id}/products`, { data: { productId } })
