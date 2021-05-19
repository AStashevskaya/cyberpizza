import axios from 'axios'

const url = '/api/products'

export const fetchPizza = () => axios.get(url)
