import { useAuth } from '../contexts/authContext'
import { useDispatch, useSelector } from 'react-redux'
import { createTransaction, modifyTransaction, deleteTransaction } from '../reducers/transactionReducer'

const useTransactions = () => {
  const { user } = useAuth()
  const list = useSelector(state => state.transactions.filter(transaction => transaction.user.name === user.name))
  const income = list.filter(transaction => transaction.type === 'income')
  const expenses = list.filter(transaction => transaction.type === 'expense')

  const dispatch = useDispatch()

  const create = (content) => {
    dispatch(createTransaction(content))
  }

  const find = (id) => {
    return list.find(transaction => transaction.id === id)
  }

  const filterCategory = (category) => {
    return list.filter(transaction => transaction.category === category)
  }

  const modify = (id, content) => {
    dispatch(modifyTransaction(id, content))
  }

  const remove = (id) => {
    dispatch(deleteTransaction(id))
  }

  const getIncomeCategories = () => {
    const incomeCategories = [
      "Paycheck",
      "Bonus",
      "Rental Income",
      "Investment",
      "Interest Income",
      "Reimbursement",
      "Miscellaneous"
    ]
    
    return incomeCategories
  }

  const getExpensesCategories = () => {
    const expensesCategories = [
      "Food",
      "Housing",
      "Bills & Utilities",
      "Transportation",    
      "Medical & Healthcare",
      "Insurance",
      "Personal Care",
      "Entertainment",
      "Education",
      "Shopping",
      "Miscellaneous"
    ]
    
    return expensesCategories
  }

  return {
    list,
    income,
    expenses,
    create,
    find,
    filterCategory,
    modify,
    remove,
    getIncomeCategories,
    getExpensesCategories
  }
}

export default useTransactions