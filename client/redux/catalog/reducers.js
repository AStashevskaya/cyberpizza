import { FETCH_PRODUCTS_REQUEST, FETCH_PRODUCTS_SUCCESS, FETCH_PRODUCTS_FAILURE } from './constants'

const initialState = {
  loading: true,
  products: [],
  error: '',
}

const catalog = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case FETCH_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case FETCH_PRODUCTS_SUCCESS:
      return {
        loading: false,
        products: payload,
        error: '',
      }
    case FETCH_PRODUCTS_FAILURE:
      return {
        loading: false,
        products: [],
        error: payload,
      }
    default:
      return state
  }
}

export default catalog
