import axios from 'axios'

const url = '/api/user'

export const createUser = (user) => axios.post(`${url}s`, user)

export const loginUser = (user) => axios.post(`${url}/login`, user)

export const logoutUser = (user = {}, token) =>
  axios.post(
    `${url}/logout`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    user
  )

export const getUserData = (token) =>
  axios.get(`/api/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
