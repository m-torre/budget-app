import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import jwt_decode from 'jwt-decode'
import { composeWithDevTools } from 'redux-devtools-extension'

import transactionReducer from './reducers/transactionReducer'
import userReducer, { clearUser } from './reducers/userReducer'
import budgetReducer from './reducers/budgetReducer'

const reducer = combineReducers({
  transactions: transactionReducer,
  budgets: budgetReducer,
  user: userReducer
})

const checkTokenExpirationMiddleware = store => next => action => {
  const token =
    JSON.parse(window.localStorage.getItem("loggedBudgetAppUser")) &&
    JSON.parse(window.localStorage.getItem("loggedBudgetAppUser"))["token"]
  
  if (token && jwt_decode(token).exp < Date.now() / 1000) {
    window.localStorage.removeItem('loggedBudgetAppUser')
    store.dispatch(clearUser())
  }

  return next(action)
}

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk, checkTokenExpirationMiddleware))
)

export default store