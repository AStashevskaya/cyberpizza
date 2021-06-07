import * as api from '../../api/user'
import { getCookies } from '../../../shared/utils/getCookie'

const LOG_OUT = 'LOG_OUT'
const LOG_USER_REQUEST = 'LOG_USER_REQUEST'
const LOG_USER_FAILURE = 'LOG_USER_FAILURE'
const LOG_USER_SUCCESS = 'LOG_USER_SUCCESS'

export const logout = () => async (dispatch) => {
  try {
    await api.logoutUser()

    dispatch({
      type: LOG_OUT,
    })
  } catch (error) {
    dispatch(logUserFailure(error))
  }
}

export const logUserRequest = () => ({
  type: LOG_USER_REQUEST,
})

export const logUserSuccess = (user) => ({
  type: LOG_USER_SUCCESS,
  payload: user,
})

export const logUserFailure = (error) => ({
  type: LOG_USER_FAILURE,
  payload: error,
})

export const signIn = (user) => async (dispatch) => {
  dispatch(logUserRequest(user))

  try {
    const { data } = await api.createUser(user)
    const { token } = data

    dispatch(getData(token))
    document.location.replace('/')
  } catch (error) {
    const { message } = error.response.data

    dispatch(logUserFailure(message))
  }
}

export const login = (user) => async (dispatch) => {
  dispatch(logUserRequest(user))

  try {
    const { data } = await api.loginUser(user)
    const { token } = data

    dispatch(getData(token))
    document.location.replace('/')
  } catch (error) {
    const { message } = error.response.data

    dispatch(logUserFailure(message))
  }
}

export const getData = (token) => async (dispatch) => {
  try {
    const { data } = await api.getUserData(token)

    dispatch(logUserSuccess(data))
  } catch (error) {
    dispatch(logUserFailure(error))
  }
}

const jwtCookie = getCookies('jwt')

const initialState = {
  currentUser: {},
  isAuth: jwtCookie ? jwtCookie : false,
  loading: false,
  error: '',
}

export const user = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case LOG_OUT:
      return {
        ...state,
        isAuth: false,
        currentUser: {},
      }
    case LOG_USER_SUCCESS:
      return {
        ...state,
        isAuth: true,
        currentUser: payload,
        loading: false,
      }
    case LOG_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: '',
      }
    case LOG_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      }
    default:
      return state
  }
}
