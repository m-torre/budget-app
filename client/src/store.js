import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import transactionReducer from './reducers/transactionReducer'
import userReducer from './reducers/userReducer'
import budgetReducer from './reducers/budgetReducer'


const reducer = combineReducers({
  transactions: transactionReducer,
  budgets: budgetReducer,
  user: userReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
)

export default store