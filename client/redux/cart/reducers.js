import {
  TOGGLE_CART,
  FETCH_CART_PRODUCTS_FAILURE,
  FETCH_CART_PRODUCTS_SUCCESS,
  FETCH_CART_PRODUCTS_REQUEST,
  UPDATE_CART,
  UPDATE_CART_ID,
} from './constants'

const checkCookies = () => {
  const arr = document.cookie.split('; ')
  const cart_id = arr.find((el) => el.startsWith('cart_id'))
  let arr1 = cart_id ? cart_id.split('=') : []
  const id = arr1.find((el) => !el.startsWith('cart_id'))
  return id
}

const initialState = {
  id: checkCookies(),
  isOpen: false,
  loading: false,
  products: [],
  total: 0,
  quantity: 0,
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
        loading: false,
        products: payload.products,
        total: payload.total,
        quantity: payload.quantity,
      }
    case FETCH_CART_PRODUCTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      }
    case UPDATE_CART:
      return {
        ...state,
        loading: false,
        products: payload.products,
        total: payload.total,
        quantity: payload.quantity,
      }
    case UPDATE_CART_ID:
      return {
        ...state,
        id: payload,
      }
    default:
      return state
  }
}

export default cart
