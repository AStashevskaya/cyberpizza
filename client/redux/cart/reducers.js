import { TOGGLE_CART } from './constants'

const initialState = {
  isOpen: false,
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
    default:
      return state
  }
}

export default cart
