import { combineReducers } from 'redux'
import { catalog } from './catalog'
import { user } from './user'
import cart from './cart/reducers'

const rootReducer = combineReducers({ catalog, cart, user })

export default rootReducer
