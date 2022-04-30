import React, { useState } from 'react'
import { useAuth } from '../contexts/authContext'
import userService from '../services/users'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
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
  FormHelperText,
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
          alignSelf: "stretch",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2
        }}
      >
        {children}
      </Box>
    )}
  </div>
)

const Login = () => {
  const [tabValue, setTabValue] = useState(0)
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()
  const location = useLocation()
  const origin = location.state?.from?.pathname || '/home'
  const { enqueueSnackbar } = useSnackbar()
  const { user, login } = useAuth()
  
  const handleTabValueChange = (event, newValue) => {
    setTabValue(newValue)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      login(username, password)

      setUsername('')
      setPassword('')

      navigate(origin)
    } catch (exception) {
      console.log('Wrong credentials')
      enqueueSnackbar('Invalid email or password', { 
        variant: 'error',
      })
    }
  }

  const handleRegister = async (event) => {
    event.preventDefault()

    try {
      await userService.create({
        username,
        name,
        password
      })

      setUsername('')
      setName('')
      setPassword('')

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

  const isValidUsername = () => {
    const usernameFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (usernameFormat.test(username)) return true
    return false
  }

  const isValidName = () => {
    const nameFormat = /^([a-zA-Z]+\s)*[a-zA-Z]+$/
    if (nameFormat.test(name) && name.length > 2) return true
    return false
  }

  const isValidPassword = () => {
    const passwordFormat = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
    if (passwordFormat.test(password)) return true
    return false
  }

  if (user) {
    return <Navigate to={origin} replace />
  }

  return (
    <Container
      component="main"
      maxWidth='xs'
      sx={{
        paddingTop: 5,
        paddingBottom: 10.5
      }}
    >
      <Card>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column"
          }}
        >
          <Typography
            component="h1"
            variant='h3'
            sx={{
              alignSelf: "center",
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
            sx={{
              alignSelf: "center",
              marginBottom: 2
            }}
          >
            <Tab label='Login' />
            <Tab label='Register' />
          </Tabs>
            
          <TabPanel value={tabValue} index={0}>
            <Avatar sx={{ bgcolor: 'secondary.main' }}>
              <LockOpenIcon />
            </Avatar>
            <Box
              component="form"
              onSubmit={handleLogin}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                width: "90%"
              }}
            >
              <TextField
                name='username'
                value={username}
                onChange={({ target }) => setUsername(target.value)}
                label='Email'
                type='email'
                required={true}
                fullWidth
              />
              <TextField
                name='password'
                value={password}
                onChange={({ target }) => setPassword(target.value)}
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
                  <strong>Password:</strong> testBudget1
                </Typography>
              </AccordionDetails>
            </Accordion>
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <Avatar sx={{ bgcolor: 'secondary.main' }}>
              <HowToRegIcon />
            </Avatar>
            <Box
              component="form"
              onSubmit={handleRegister}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                width: "90%"
              }}
            >
              <TextField
                name='name'
                value={name}
                onChange={({ target }) => setName(target.value)}
                label='Name'
                required={true}
                error={name !== '' && !isValidName()}
                fullWidth
              />
              {name !== '' && !isValidName() && (
              <FormHelperText error>The name must be at least 3 letters long.</FormHelperText>
              )}
              <TextField
                name='username'
                value={username}
                onChange={({ target }) => setUsername(target.value)}
                label='Email'
                type='email'
                required={true}
                error={username !== '' && !isValidUsername()}
                fullWidth
              />
              {username !== '' && !isValidUsername() && (
              <FormHelperText error>The email must have a valid format.</FormHelperText>
              )}
              <TextField
                name='password'
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                label='Password'
                type='password'
                required={true}
                error={password !== '' && !isValidPassword()}
                fullWidth
              />
              {password !== '' && !isValidPassword() && (
              <FormHelperText error>The password must be at least 8 characters long and have a lowercase letter, an uppercase letter and a number.</FormHelperText>
              )}
              <Button
                type='submit'
                color='primary'
                variant='contained'
                fullWidth
                disabled={!isValidName() || !isValidUsername() || !isValidPassword()}
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