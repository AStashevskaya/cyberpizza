import axios from 'axios'

const url = '/api/products'

export const fetchPizza = () => axios.get(url)
export const createPizza = (pizza) => axios.post(url, pizza)
