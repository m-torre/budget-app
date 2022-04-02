import React, { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Routes, Route
} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { initializeTransactions } from './reducers/transactionReducer'
import { ThemeProvider } from '@mui/material/styles'
import {
  Container,
  CssBaseline,
  Stack
} from '@mui/material'
import ResponsiveAppBar from './components/ResponsiveAppBar'
import Home from './components/Home'
import Transactions from './components/Transactions'
import theme from './theme'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeTransactions())
  }, [dispatch])

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth='md'>
          <Stack spacing={2}>
            <ResponsiveAppBar />
            <Routes>
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/" element={<Home />} />
            </Routes>
          </Stack>  
        </Container>
      </ThemeProvider>
    </Router>
  )
}

export default App