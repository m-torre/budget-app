import transactionService from '../services/transactions'

const transactionReducer = (state = [], action) => {
  switch(action.type) {
    case 'INIT_TRANSACTIONS':
      return action.data
    case 'NEW_TRANSACTION':
      return state.concat(action.data)
    case 'MODIFY_TRANSACTION':
      const newState = [ ...state ]
      const index = newState.findIndex(transaction => transaction.id === action.data.id)
      newState[index].name = action.data.name
      newState[index].amount = action.data.amount
      newState[index].date = action.data.date
      newState[index].category = action.data.category
      return newState
    case 'DELETE_TRANSACTION':
      return state.filter(transaction => transaction.id !== action.data.id)
    default: return state
  }
}

export const initializeTransactions = () => {
  return async dispatch => {
    const transactions = await transactionService.getAll()
    dispatch({
      type: 'INIT_TRANSACTIONS',
      data: transactions
    })
  }
}

export const createTransaction = (content) => {
  return async dispatch => {
    const newTransaction = await transactionService.create(content)
    dispatch({
      type: 'NEW_TRANSACTION',
      data: newTransaction
    })
  }
}

export const modifyTransaction = (id, content) => {
  return async dispatch => {
    const updatedTransaction = await transactionService.update(id, content)
    dispatch({
      type: 'MODIFY_TRANSACTION',
      data: updatedTransaction
    })
  }
}

export const deleteTransaction = (id) => {
  return async dispatch => {
    await transactionService.deleteTransaction(id)
    dispatch({
      type: 'DELETE_TRANSACTION',
      data: {
        id
      }
    })
  }
}

export default transactionReducer