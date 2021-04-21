import axios from 'axios'

const url = '/api/carts'

export const createCart = (cart) => axios.post(url, cart)
export const getCart = () => axios.get(`${url}/:id`)