import { useAuth } from '../contexts/authContext'
import { useDispatch, useSelector } from 'react-redux'
import { createBudget, modifyBudget, deleteBudget } from '../reducers/budgetReducer'

const useBudgets = () => {
  const { user } = useAuth()
  const list = useSelector(state => state.budgets.filter(budget => budget.user.name === user.name))

  const dispatch = useDispatch()
  
  const create = (content) => {
    dispatch(createBudget(content))
  }

  const find = (category) => {
    return list.find(budget => budget.category === category)
  }

  const modify = (id, content) => {
    dispatch(modifyBudget(id, content))
  }

  const remove = (id) => {
    dispatch(deleteBudget(id))
  }

  return {
    list,
    create,
    find,
    modify,
    remove
  }
}

export default useBudgets