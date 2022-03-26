import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import transactionReducer from './reducers/transactionReducer'

const store = createStore(
  transactionReducer,
  composeWithDevTools(applyMiddleware(thunk))
)

export default store