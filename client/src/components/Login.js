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
      login(event.target.username.value, event.target.password.value)

      event.target.username.value = ''
      event.target.password.value = ''

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
            </Box>
          </TabPanel>
        </CardContent>
      </Card>
    </Container>
  )
}

export default Login