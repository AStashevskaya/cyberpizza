import { combineReducers } from 'redux'
import { catalog } from './catalog'
import { user } from './user'
import { order } from './order'
import cart from './cart/reducers'

const rootReducer = combineReducers({ catalog, cart, user, order })

export default rootReducer
