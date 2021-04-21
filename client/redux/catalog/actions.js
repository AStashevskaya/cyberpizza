import axios from 'axios'
import { fetchPizza } from '../../api'

import { FETCH_PRODUCTS_REQUEST, FETCH_PRODUCTS_SUCCESS, FETCH_PRODUCTS_FAILURE } from './constants'

const fetchProductsRequest = () => ({
  type: FETCH_PRODUCTS_REQUEST,
})

const fetchProductsSuccess = (data) => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: data,
})

const fetchProductsFail = (error) => ({
  type: FETCH_PRODUCTS_FAILURE,
  payload: error,
})

const fetchProducts = () => async (dispatch) => {
  dispatch(fetchProductsRequest)

  const products = await fetchPizza()
  try {
    const { data } = products
    dispatch(fetchProductsSuccess(data))
  } catch (error) {
    const { messege } = error
    dispatch(fetchProductsFail(messege))
  }
  //   dispatch(fetchProductsRequest);

  //     fetchPizza()
  //     .then(
  //       (response) => {
  //         const { data } = response;

  //         dispatch(fetchProductsSuccess(data));
  //       },
  //     )
  //     .catch(
  //       (error) => {
  //         const { messege } = error;
  //         dispatch(fetchProductsFail(messege));
  //       },
  //     );
}

export { fetchProducts }
