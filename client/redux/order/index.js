import * as api from '../../api/order'
import { clearCart } from '../../api/cart'
import { fetchCartProductsSuccess } from '../cart/actions'

const FETCH_ORDER_REQUEST = 'FETCH_ORDER_REQUEST'
const FETCH_ORDER_SUCCESS = 'FETCH_ORDER_SUCCESS'
const FETCH_ORDER_FAILURE = 'FETCH_ORDER_FAILURE'

import { getCookies } from '../../../shared/utils/getCookie'

const initialState = {
  id: getCookies('order'),
  message: '',
  loading: false,
  status: null,
  order: {},
  error: '',
}

const fetchOrderRequest = () => ({
  type: FETCH_ORDER_REQUEST,
})

const fetchOrderSuccess = (products) => ({
  type: FETCH_ORDER_SUCCESS,
  payload: products,
})

const fetchOrderFailure = (error) => ({
  type: FETCH_ORDER_FAILURE,
  payload: error,
})

export const createOrder = () => async (dispatch, getState) => {
  const { products, total, id } = getState().cart

  try {
    const { data } = await api.postOrder({ products, total })
    const { order, message } = data

    dispatch(fetchOrderSuccess({ status: order.status, message, order }))
    await clearCart(id)

    dispatch(fetchCartProductsSuccess({ products: [], total: 0, quantity: 0 }))
  } catch (error) {
    dispatch(fetchOrderFailure(error.message))
  }
}

export const getOrderStatus = () => async (dispatch, getState) => {
  const { id: orderId } = getState().order

  if (!order.id) {
    return
  }

  dispatch(fetchOrderRequest())

  try {
    const data = await api.getOrder(orderId)

    const { status } = data.data

    dispatch(fetchOrderSuccess({ status }))
  } catch (error) {
    dispatch(fetchOrderFailure(error.message))
  }
}

export const order = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case FETCH_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case FETCH_ORDER_SUCCESS:
      return {
        loading: false,
        status: payload.status ? payload.status : state.status,
        message: payload.message ? payload.message : '',
        order: payload.order,
        error: '',
      }
    case FETCH_ORDER_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      }
    default:
      return state
  }
}
