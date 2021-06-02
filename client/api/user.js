import axios from 'axios'

const url = '/api/user'

export const createUser = (user) => axios.post(`${url}s`, user)

export const loginUser = (user) => axios.post(`${url}/login`, user)

export const logoutUser = () => axios.post(`${url}/logout`)

export const getUserData = () => axios.get(`/api/user`)
