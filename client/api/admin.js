import axios from 'axios'

const url = '/api/'

export const getData = (option) => axios.get(`${url}${option}`)
export const createProduct = (product) => axios.post(`${url}products`, product)
export const updateProduct = (product, id) => axios.put(`${url}/products/${id}`, product)
export const deleteProduct = (productId) => axios.delete(`${url}/products`, { data: { productId } })

export const updateUser = (product, id) => axios.put(`${url}users/${id}`, product)
export const deleteUser = (userId) => axios.delete(`${url}users`, { data: { userId } })

export const updateOrder = (order, id) => axios.put(`${url}orders/${id}`, order)
export const deleteOrder = (userId) => axios.delete(`${url}orders`, { data: { userId } })
