import React, { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { initializeTransactions } from './reducers/transactionReducer'
import { initializeBudgets } from './reducers/budgetReducer'
import { useAuth } from './contexts/authContext'
import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import { SnackbarProvider } from 'notistack'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DateAdapter from '@mui/lab/AdapterDateFns'
import theme from './theme'
import ResponsiveAppBar from './components/ResponsiveAppBar'
import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import Transactions from './components/Transactions'
import Budgets from './components/Budgets'
import Footer from './components/Footer'
import NoMatch from './components/NoMatch'

const App = () => {
  const { user } = useAuth()
  const dispatch = useDispatch()
  
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
              <Route
                path="*"
                element={<NoMatch />}
              />
            </Routes>
            <Footer />
          </LocalizationProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </Router>
  )
}

export default App