import {
  TOGGLE_CART,
  FETCH_CART_PRODUCTS_FAILURE,
  FETCH_CART_PRODUCTS_SUCCESS,
  FETCH_CART_PRODUCTS_REQUEST,
} from './constants'

const initialState = {
  isOpen: false,
  loading: false,
  products: [],
  total: 0,
  error: '',
}

const cart = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case TOGGLE_CART:
      return {
        ...state,
        isOpen: !state.isOpen,
      }
    case FETCH_CART_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case FETCH_CART_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: payload.products,
        total: payload.total,
      }
    case FETCH_CART_PRODUCTS_FAILURE:
      return {
        ...state,
        error: payload,
      }
    default:
      return state
  }
}

export default cart
