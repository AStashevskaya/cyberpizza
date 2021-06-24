import axios from 'axios'

const url = '/api/'

export const getData = (option) => axios.get(`${url}${option}`)
export const createProduct = (product) => axios.post(`${url}products`, product)
export const updateProduct = (product, id) => axios.put(`${url}/products/${id}`, product)

export const updateAdminDataItem = (title, item, id) => axios.put(`${url}${title}/${id}`, item)
export const deleteAdminDataItem = (title, id) =>  axios.delete(`${url}${title}`, { data: { id } })
