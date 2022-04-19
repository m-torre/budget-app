import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import loginService from '../services/login'
import userService from '../services/users'
import transactionService from '../services/transactions'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../reducers/userReducer'
import { Navigate } from 'react-router-dom'
import {
  Avatar,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Tab,
  Tabs,
  TextField,
  Typography
} from '@mui/material'
import { useSnackbar } from 'notistack'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn'
import LockOpenIcon from '@mui/icons-material/LockOpen'
import HowToRegIcon from '@mui/icons-material/HowToReg'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const TabPanel = ({ children, value, index, ...other }) => (
  <div {...other}>
    {value === index && (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        {children}
      </Box>
    )}
  </div>
)

const Login = () => {
  const user = useSelector(state => state.user)
  const [tabValue, setTabValue] = useState(0)

  const handleTabValueChange = (event, newValue) => {
    setTabValue(newValue)
  }

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username: event.target.username.value,
        password: event.target.password.value
      })
      
      window.localStorage.setItem(
        'loggedBudgetAppUser', JSON.stringify(user)
      ) 
      transactionService.setToken(user.token)
      dispatch(setUser(user))
      
      event.target.username.value = ''
      event.target.password.value = ''

      navigate('/home')
    } catch (exception) {
      enqueueSnackbar('Invalid email or password', { 
        variant: 'error',
      })
      console.log('Wrong credentials')
    }
  }

  const handleRegister = async (event) => {
    event.preventDefault()

    try {
      await userService.create({
        username: event.target.username.value,
        name: event.target.name.value,
        password: event.target.password.value
      })

      event.target.username.value = ''
      event.target.name.value = ''
      event.target.password.value = ''

      enqueueSnackbar('User registered', { 
        variant: 'success',
      })
    } catch (exception) {
      console.log('Unable to register the user in the database')
      enqueueSnackbar('Failed to register the user', { 
        variant: 'error',
      })
    }
  }

  if (user) {
    return <Navigate to={"/home"} replace />
  }

  return (
    <Container
      component="main"
      maxWidth='xs'
      sx={{ paddingTop: 5 }}
    >
      <Card>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <Typography
            component="h1"
            variant='h3'
            sx={{
              display: 'flex',
              alignItems: 'center',
              columnGap: 0.5,
              marginBottom: 2
            }}
          >
            <MonetizationOnIcon
              color="primary"
              fontSize='inherit'
            />
            Budget App
          </Typography>
            
          <Tabs
            value={tabValue}
            onChange={handleTabValueChange}
            sx={{ marginBottom: 2 }}
          >
            <Tab label='Login' />
            <Tab label='Register' />
          </Tabs>
            
          <TabPanel value={tabValue} index={0}>
            <Avatar
              sx={{
                bgcolor: 'secondary.main',
                marginBottom: 2
              }}
            >
              <LockOpenIcon />
            </Avatar>
            <Box
              component="form"
              onSubmit={handleLogin}
              sx={{
                width: "90%",
                marginBottom: 2
              }}
            >
              <TextField
                name='username'
                label='Email'
                type='email'
                required={true}
                fullWidth
                sx={{ marginBottom: 2 }}
              />
              <TextField
                name='password'
                label='Password'
                type='password'
                required={true}
                fullWidth
                sx={{ marginBottom: 2 }}
              />
              <Button
                type='submit'
                color='primary'
                variant='contained'
                fullWidth
              >
                Login
              </Button>
            </Box>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel-content"
                id="panel-header"
              >
                <Typography align='center'>
                  Want to try the app without registering?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography
                  align='center'
                  sx={{ marginBottom: 1 }}
                >
                  Use the following test account:
                </Typography>
                <Typography align='center'>
                  <strong>E-mail:</strong> test@budget-app.com
                </Typography>
                <Typography align='center'>
                  <strong>Password:</strong> testBudget
                </Typography>
              </AccordionDetails>
            </Accordion>
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <Avatar
              sx={{
                bgcolor: 'secondary.main',
                marginBottom: 2
              }}>
              <HowToRegIcon />
            </Avatar>
            <Box
              component="form"
              onSubmit={handleRegister}
              sx={{ width: "90%" }}
            >
              <TextField
                name='name'
                label='Name'
                required={true}
                fullWidth
                sx={{ marginBottom: 2 }}
              />
              <TextField
                name='username'
                label='Email'
                type='email'
                required={true}
                fullWidth
                sx={{ marginBottom: 2 }}
              />
              <TextField
                name='password'
                label='Password'
                type='password'
                required={true}
                fullWidth
                sx={{ marginBottom: 2 }}
              />
              <Button
                type='submit'
                color='primary'
                variant='contained'
                fullWidth
              >
                Register
              </Button>
            </Box>
          </TabPanel>
        </CardContent>
      </Card>
    </Container>
  )
}

export default Login