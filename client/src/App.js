import React, { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { initializeTransactions } from './reducers/transactionReducer'
import { ThemeProvider } from '@mui/material/styles'
import {
  AppBar,
  Button,
  Container,
  CssBaseline,
  Stack,
  Toolbar,
} from '@mui/material'
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
          <Stack spacing={3}>
            <AppBar position="static">
              <Toolbar>
                <Button
                  color="inherit" component={Link} to="/">
                  Home
                </Button>
                <Button color="inherit" component={Link} to="/transactions">
                  Transactions
                </Button>
              </Toolbar>
            </AppBar>
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