import { fetchPizza } from '../../api/catalog'

import { FETCH_PRODUCTS_REQUEST, FETCH_PRODUCTS_SUCCESS, FETCH_PRODUCTS_FAILURE } from './constants'

const fetchProductsRequest = () => ({
  type: FETCH_PRODUCTS_REQUEST,
})

const fetchProductsSuccess = (products) => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: products,
})

const fetchProductsFail = (error) => ({
  type: FETCH_PRODUCTS_FAILURE,
  payload: error,
})

export const fetchProducts = () => async (dispatch) => {
  dispatch(fetchProductsRequest)

  try {
    const products = await fetchPizza()
    const { data } = await products

    dispatch(fetchProductsSuccess(data))
  } catch (error) {
    const { messege } = error
    dispatch(fetchProductsFail(messege))
  }
}
