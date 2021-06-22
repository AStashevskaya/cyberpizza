import { fetchPizza } from '../../api/catalog'

const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST'
const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS'
const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE'

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

const initialState = {
  loading: true,
  products: [],
  error: '',
}

export const catalog = (state = initialState, action) => {
  const { type, payload } = action
  console.log('payload prod', payload)

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
