import { combineReducers } from 'redux'
import catalog from './catalog/reducers'
import cart from './cart/reducers'

const rootReducer = combineReducers({ catalog, cart })

export default rootReducer
