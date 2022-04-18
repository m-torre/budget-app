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
  Grid,
  Stack,
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
    {value === index && <Box>{children}</Box>}
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
        <CardContent>
          <Grid
            container
            direction='column'
            spacing={2}
            justifyContent='center'
            alignItems='center'
          >
            <Grid item>
              <Typography
                component="h1"
                variant='h3'
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  columnGap: 0.5
                }}
              >
                <MonetizationOnIcon
                  color="primary"
                  fontSize='inherit'
                />
                Budget App
              </Typography>
            </Grid>

            <Grid item>
              <Tabs
                value={tabValue}
                onChange={handleTabValueChange}
              >
                <Tab label='Login' />
                <Tab label='Register' />
              </Tabs>
            </Grid>
            <Grid item>
              <TabPanel value={tabValue} index={0}>
                <Stack
                  spacing={2}
                  alignItems='center'
                >
                  <Avatar sx={{ bgcolor: 'secondary.main' }}>
                    <LockOpenIcon />
                  </Avatar>
                  <Box component="form" onSubmit={handleLogin}>
                    <Stack spacing={2}>
                      <TextField
                        name='username'
                        label='Email'
                        type='email'
                        required={true}
                        fullWidth
                      />
                      <TextField
                        name='password'
                        label='Password'
                        type='password'
                        required={true}
                        fullWidth
                      />
                      <Button
                        type='submit'
                        color='primary'
                        variant='contained'
                        fullWidth
                      >
                        Login
                      </Button>
                    </Stack>
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
                      <Grid
                        container
                        direction='column'
                        spacing={1}
                      >
                        <Grid item>
                          <Typography align='center'>
                            Use the following test account:
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography align='center'>
                            <strong>E-mail:</strong> test@budget-app.com
                          </Typography>
                          <Typography align='center'>
                            <strong>Password:</strong> testBudget
                          </Typography>
                        </Grid>
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                </Stack>
              </TabPanel>
              <TabPanel value={tabValue} index={1}>
                <Stack
                  spacing={2}
                  alignItems='center'
                >
                  <Avatar sx={{ bgcolor: 'secondary.main' }}>
                    <HowToRegIcon />
                  </Avatar>
                  <Box component="form" onSubmit={handleRegister}>
                    <Stack spacing={2}>
                      <TextField
                        name='name'
                        label='Name'
                        required={true}
                        fullWidth
                      />
                      <TextField
                        name='username'
                        label='Email'
                        type='email'
                        required={true}
                        fullWidth
                      />
                      <TextField
                        name='password'
                        label='Password'
                        type='password'
                        required={true}
                        fullWidth
                      />
                      <Button
                        type='submit'
                        color='primary'
                        variant='contained'
                        fullWidth
                      >
                        Register
                      </Button>
                    </Stack>
                  </Box>
                </Stack>
              </TabPanel>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  )
}

export default Login