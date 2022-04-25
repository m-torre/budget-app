import budgetService from '../services/budgets'

const budgetReducer = (state = [], action) => {
  switch(action.type) {
    case 'INIT_BUDGETS':
      return action.data
    case 'NEW_BUDGET':
      return state.concat(action.data)
    case 'MODIFY_BUDGET':
      const newState = [ ...state ]
      const index = newState.findIndex(budget => budget.id === action.data.id)
      newState[index].amount = action.data.amount
      return newState
    case 'DELETE_BUDGET':
      return state.filter(budget => budget.id !== action.data.id)
    default: return state
  }
}

export const initializeBudgets = () => {
  return async dispatch => {
    const budgets = await budgetService.getAll()
    dispatch({
      type: 'INIT_BUDGETS',
      data: budgets
    })
  }
}

export const createBudget = (content) => {
  return async dispatch => {
    const newBudget = await budgetService.create(content)
    dispatch({
      type: 'NEW_BUDGET',
      data: newBudget
    })
  }
}

export const modifyBudget = (id, content) => {
  return async dispatch => {
    const updatedBudget = await budgetService.update(id, content)
    dispatch({
      type: 'MODIFY_BUDGET',
      data: updatedBudget
    })
  }
}

export const deleteBudget = (id) => {
  return async dispatch => {
    await budgetService.deleteBudget(id)
    dispatch({
      type: 'DELETE_BUDGET',
      data: {
        id
      }
    })
  }
}

export default budgetReducer