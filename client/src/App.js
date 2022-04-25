import React, { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './reducers/userReducer'
import { initializeTransactions } from './reducers/transactionReducer'
import { initializeBudgets } from './reducers/budgetReducer'
import transactionService from './services/transactions'
import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import { SnackbarProvider } from 'notistack'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DateAdapter from '@mui/lab/AdapterDateFns'
import ResponsiveAppBar from './components/ResponsiveAppBar'
import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import Transactions from './components/Transactions'
import Budgets from './components/Budgets'
import Footer from './components/Footer'
import theme from './theme'

const App = () => {
  const user = useSelector(state => state.user)

  const dispatch = useDispatch()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBudgetAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      transactionService.setToken(user.token)
    }
  }, [dispatch])
  
  useEffect(() => {
    dispatch(initializeTransactions())
    dispatch(initializeBudgets())
  }, [dispatch])

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
        >
          <LocalizationProvider dateAdapter={DateAdapter}>
            <CssBaseline />
            { user && <ResponsiveAppBar /> }
            <Routes>
              <Route
                index
                element={<Login />}
              />
              <Route
                path="login"
                element={<Login />}
              />
              <Route
                element={<ProtectedRoute isAllowed={!!user} />}
              >
                <Route
                  path="home"
                  element={<Home />}
                />
                <Route
                  path="transactions"
                  element={<Transactions />}
                />
                <Route
                  path="budgets"
                  element={<Budgets />}
                />
              </Route>
            </Routes>
            <Footer />
          </LocalizationProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </Router>
  )
}

export default App