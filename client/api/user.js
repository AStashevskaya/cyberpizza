import axios from 'axios'

const url = '/api/user'

export const createUser = (user) => axios.post(`${url}s`, user)

export const loginUser = (user) => axios.post(`${url}/login`, user)

export const logoutUser = () => axios.delete(`${url}/logout`, { data: {} })

export const getUserData = (token) =>
  axios.get(`/api/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
