import {
  TOGGLE_CART,
  ADD_TO_CART,
  UPDATE_CART,
  REMOVE_FROM_CART,
  FETCH_CART_PRODUCTS_FAILURE,
  FETCH_CART_PRODUCTS_SUCCESS,
  FETCH_CART_PRODUCTS_REQUEST,
} from './constants'

import * as api from '../../api/cart'

export const toggleCart = () => ({
  type: TOGGLE_CART,
})

export const addToCart = () => ({
  type: ADD_TO_CART,
})

export const updateCart = () => ({
  type: UPDATE_CART,
})

export const removeFromCart = () => ({
  type: REMOVE_FROM_CART,
})

export const fetchCartProductsRequest = () => ({
  type: FETCH_CART_PRODUCTS_REQUEST,
})

export const fetchCartProductsFailure = (error) => ({
  type: FETCH_CART_PRODUCTS_FAILURE,
  payload: error,
})

export const fetchCartProductsSuccess = (products) => ({
  type: FETCH_CART_PRODUCTS_SUCCESS,
  payload: products,
})

export const getCartProducts = () => async (dispatch) => {
  dispatch(fetchCartProductsRequest())

  try {
    const data = await api.getCart()

    const { products, total } = await data.data

    dispatch(fetchCartProductsSuccess({ products, total }))
  } catch (error) {
    dispatch(fetchCartProductsFailure(error.message))
  }
}

export const updateCartProducts = (productId) => async (dispatch, getState) => {
  const { products } = getState().cart

  const productInCart = products.find((product) => productId === product.productId)

  if (productInCart) {
    try {
      await api.changeQuantity({ productId, quantity: productInCart.quantity + 1 })

      const data = await api.getCart()
      const { products, total } = await data.data

      dispatch(fetchCartProductsSuccess({ products, total }))
    } catch (error) {
      dispatch(fetchCartProductsFailure(error.message))
    }
  } else {
    const { products: catalogProducts } = getState().catalog
    const currentProduct = catalogProducts.find((product) => productId === product._id)
    const { image, name, price } = currentProduct

    try {
      await api.addToCart({ productId, image, name, price, quantity: 1 })

      const data = await api.getCart()
      const { products, total } = await data.data
      console.log(products)

      dispatch(fetchCartProductsSuccess({ products, total }))
    } catch (error) {
      dispatch(fetchCartProductsFailure(error.message))
    }
  }
}

export const removeProduct = (productId) => async (dispatch) => {
  try {
    console.log('from action', productId)
    await api.deleteProduct(productId)

    const data = await api.getCart()
    const { products, total } = await data.data
    console.log(products)

    dispatch(fetchCartProductsSuccess({ products, total }))
  } catch (error) {
    dispatch(fetchCartProductsFailure(error.message))
  }
}
