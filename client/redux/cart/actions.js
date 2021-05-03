import {
  TOGGLE_CART,
  UPDATE_CART,
  FETCH_CART_PRODUCTS_FAILURE,
  FETCH_CART_PRODUCTS_SUCCESS,
  FETCH_CART_PRODUCTS_REQUEST,
  UPDATE_CART_ID,
} from './constants'
import getCookies from '../../utils/getCookie'

import * as api from '../../api/cart'

export const toggleCart = () => ({
  type: TOGGLE_CART,
})

export const updateCart = (cart) => ({
  type: UPDATE_CART,
  payload: cart,
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

export const getCartProducts = () => async (dispatch, getState) => {
  const { id: cartId } = getState().cart
  dispatch(fetchCartProductsRequest())

  try {
    const data = await api.getCart(cartId)

    const { products, total } = await data.data

    const quantity = products.reduce((accum, product) => accum + product.quantity, 0)

    dispatch(fetchCartProductsSuccess({ products, total, quantity }))
  } catch (error) {
    dispatch(fetchCartProductsFailure(error.message))
  }
}

export const createCart = (productId) => async (dispatch) => {
  try {
    const result = await api.createCart({})
    const { data } = result
    console.log(result, data)

    const id = getCookies()

    dispatch({ type: UPDATE_CART_ID, payload: id })
    dispatch(updateCartProducts(productId))
  } catch (error) {
    dispatch(fetchCartProductsFailure(error.message))
  }
}

export const updateCartProducts = (productId) => async (dispatch, getState) => {
  dispatch(fetchCartProductsRequest())
  const { products, id: cartId } = getState().cart

  const productInCart = products.find((product) => productId === product.productId)

  if (productInCart) {
    try {
      await api.changeQuantity({ productId, quantity: productInCart.quantity + 1 }, cartId)
      console.log(productInCart)

      productInCart.quantity += 1

      const total = products.reduce((accum, product) => accum + product.quantity * product.price, 0)
      const quantity = products.reduce((accum, product) => accum + product.quantity, 0)

      console.log(total, quantity)

      dispatch(updateCart({ total, products, quantity }))
    } catch (error) {
      dispatch(fetchCartProductsFailure(error.message))
    }
  } else {
    const { products: catalogProducts } = getState().catalog
    const currentProduct = catalogProducts.find((product) => productId === product._id)
    const { image, name, price } = currentProduct

    try {
      await api.addToCart({ productId, image, name, price, quantity: 1 }, cartId)

      products.push({ productId, image, name, price, quantity: 1 })
      console.log(products)

      const total = products.reduce((accum, product) => accum + product.quantity * product.price, 0)

      const quantity = products.reduce((accum, product) => accum + product.quantity, 0)
      console.log(total, quantity)

      dispatch(updateCart({ total, products, quantity }))
    } catch (error) {
      dispatch(fetchCartProductsFailure(error.message))
    }
  }
}

export const removeProduct = (productId) => async (dispatch, getState) => {
  dispatch(fetchCartProductsRequest())
  const { products, id: cartId } = getState().cart

  try {
    await api.deleteProduct(productId, cartId)

    const product = products.find((product) => product.productId === productId)
    const prodIdx = products.indexOf(product)

    products.splice(prodIdx, 1)

    const total = products.reduce((accum, product) => accum + product.quantity * product.price, 0)

    const quantity = products.reduce((accum, product) => accum + product.quantity, 0)

    dispatch(updateCart({ total, products, quantity }))
  } catch (error) {
    dispatch(fetchCartProductsFailure(error.message))
  }
}
