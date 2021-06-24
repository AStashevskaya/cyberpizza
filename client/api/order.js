import axios from 'axios'
import { getCookies } from '../../shared/utils/getCookie'

const url = '/api/orders'
// const order = getCookies('order')

export const postOrder = (order) => axios.post(url, order)

export const updateOrderStatus = (orderId, status) => axios.put(`${url}/${orderId}`, { status })

export const getOrder = (orderId) => axios.get(`${url}/${orderId}`)
