import axios from 'axios'

const url = '/api/orders'

export const postOrder = (order) => axios.post(url, order)

export const updateOrderStatus = (orderId, status) => axios.put(`${url}/${orderId}`, { status })

export const getOrder = (orderId) => axios.get(`${url}/${orderId}`)
