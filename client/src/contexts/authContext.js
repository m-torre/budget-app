import React, { createContext, useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUser, clearUser } from '../reducers/userReducer'
import loginService from '../services/login'
import transactionService from '../services/transactions'
import budgetService from '../services/budgets'

const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBudgetAppUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      dispatch(setUser(loggedUser))
      transactionService.setToken(loggedUser.token)
      budgetService.setToken(loggedUser.token)
    }
  }, [dispatch])

  const login = async (username, password) => {
    const loggedUser = await loginService.login({
      username,
      password
    })

    window.localStorage.setItem(
      'loggedBudgetAppUser', JSON.stringify(loggedUser)
    ) 
    transactionService.setToken(loggedUser.token)
    budgetService.setToken(loggedUser.token)
    dispatch(setUser(loggedUser))
  }

  const logout = () => {
    window.localStorage.removeItem('loggedBudgetAppUser')
    dispatch(clearUser())
  }

  const value = {
    user,
    login,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => {
  return useContext(AuthContext)
}

export { AuthProvider, useAuth }