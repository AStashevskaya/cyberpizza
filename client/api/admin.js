import axios from 'axios'

const url = '/api/'

export const getData = (option) => axios.get(`${url}/${option}`)
export const createProduct = (product) => axios.post(`${url}/products`, product)
export const updateProduct = (product) => axios.put(`${url}/products`, product)
export const deleteProduct = (productId) => axios.delete(`${url}/products`, { data: { productId } })
