import axios from 'axios'

const url = '/api/user'

export const createUser = (user) => axios.post(`${url}s`, user)
