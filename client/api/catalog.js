import axios from 'axios'

const url = '/api/products'

export const fetchPizza = () => axios.get(url)
export const createProduct = (product) => axios.post(url, product)
export const deleteProduct = (productId) => axios.delete(url, { data: { productId } })
export const updateProduct = (product, productId) => axios.put(`${url}/${productId}`, product)
