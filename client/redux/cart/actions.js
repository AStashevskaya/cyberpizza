import {
  TOGGLE_CART,
  UPDATE_CART,
  FETCH_CART_PRODUCTS_FAILURE,
  FETCH_CART_PRODUCTS_SUCCESS,
  FETCH_CART_PRODUCTS_REQUEST,
  UPDATE_CART_ID,
} from './constants'
import swell from 'swell-js'
import config from '../../../config'

import * as api from '../../api/cart'

swell.init(config.storeId, config.publicKey)

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

// export const getCartProducts = () => async (dispatch, getState) => {
//   const { id: cartId } = getState().cart

//   if (!cartId) {
//     return
//   }

//   dispatch(fetchCartProductsRequest())

//   try {
//     const data = await api.getCart(cartId)

//     const { products, total } = await data.data

//     const quantity = products.reduce((accum, product) => accum + product.quantity, 0)

//     dispatch(fetchCartProductsSuccess({ products, total, quantity }))
//   } catch (error) {
//     dispatch(fetchCartProductsFailure(error.message))
//   }
// }

export const createCart = (productId) => async (dispatch) => {
  try {
    const result = await api.createCart({})
    const { data } = result

    dispatch({ type: UPDATE_CART_ID, payload: data._id })
    dispatch(updateCartProducts(productId))
  } catch (error) {
    dispatch(fetchCartProductsFailure(error.message))
  }
}

export const updateCartProducts = (productId) => async (dispatch, getState) => {
  dispatch(fetchCartProductsRequest())
  const { products, id: cartId } = getState().cart

  const productInCart = products.find((product) => productId === product._id)

  if (productInCart) {
    try {
      await api.changeQuantity({ productId, quantity: productInCart.quantity + 1 }, cartId)

      productInCart.quantity += 1

      const total = products.reduce((accum, product) => accum + product.quantity * product.price, 0)
      const quantity = products.reduce((accum, product) => accum + product.quantity, 0)

      dispatch(updateCart({ total, products, quantity }))
    } catch (error) {
      dispatch(fetchCartProductsFailure(error.message))
    }
  } else {
    const { products: catalogProducts } = getState().catalog
    const currentProduct = catalogProducts.find((product) => productId === product._id)

    try {
      await api.addToCart({ productId }, cartId)

      products.push({ ...currentProduct, quantity: 1 })

      const total = products.reduce((accum, product) => accum + product.quantity * product.price, 0)

      const quantity = products.reduce((accum, product) => accum + product.quantity, 0)

      dispatch(updateCart({ total, products, quantity }))
    } catch (error) {
      dispatch(fetchCartProductsFailure(error.message))
    }
  }
}

// export const removeProduct = (productId) => async (dispatch, getState) => {
//   dispatch(fetchCartProductsRequest())
//   const { products, id: cartId } = getState().cart

//   try {
//     await api.deleteProduct(productId, cartId)

//     const prodIdx = products.findIndex((product) => product._id === productId)

//     products.splice(prodIdx, 1)

//     const total = products.reduce((accum, product) => accum + product.quantity * product.price, 0)

//     const quantity = products.reduce((accum, product) => accum + product.quantity, 0)

//     dispatch(updateCart({ total, products, quantity }))
//   } catch (error) {
//     dispatch(fetchCartProductsFailure(error.message))
//   }
// }

export const getCartProducts = () => async (dispatch) => {
  dispatch(fetchCartProductsRequest())

  try {
    const cart = await swell.cart.get()

    const quantity =
      (cart && cart.items.reduce((accum, product) => accum + product.quantity, 0)) || 0

    console.log('cart', cart)
    dispatch(
      fetchCartProductsSuccess({
        products: (cart && cart.items) || [],
        total: (cart && cart.grand_total) || 0,
        quantity,
        cart: cart,
      })
    )
  } catch (error) {
    dispatch(fetchCartProductsFailure(error.message))
  }
}

export const removeProduct = (productId) => async (dispatch) => {
  dispatch(fetchCartProductsRequest())

  try {
    const cart = await swell.cart.removeItem(productId)
    const quantity = cart.items.reduce((accum, product) => accum + product.quantity, 0)

    dispatch(updateCart({ cart, total: cart.grand_total, products: cart.items, quantity }))
  } catch (error) {
    dispatch(fetchCartProductsFailure(error.message))
  }
}

export const addToCart = (productId) => async (dispatch) => {
  dispatch(fetchCartProductsRequest())

  try {
    const cart = await swell.cart.addItem({
      product_id: productId,
      quantity: 1,
    })

    const quantity = cart.items.reduce((accum, product) => accum + product.quantity, 0)

    dispatch(updateCart({ cart, total: cart.grand_total, products: cart.items, quantity }))
  } catch (error) {
    dispatch(fetchCartProductsFailure(error.message))
  }
}
