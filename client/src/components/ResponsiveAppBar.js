import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { clearUser } from '../reducers/userReducer'
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu' 
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn'

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null)

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }
  
  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const dispatch = useDispatch()

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBudgetAppUser')
    dispatch(clearUser())
  }

  return (
    <AppBar
      position="static"
      sx={{ marginBottom: 2 }}
    >
      <Container>
        <Toolbar disableGutters>
          <Typography
            variant='h6'
            sx={{
              display: { xs: 'none', sm: 'flex' },
              flexGrow: 1,
              alignItems: 'center',
              columnGap: 0.5
            }}
          >
            <MonetizationOnIcon />
            Budget App
          </Typography>
          <Box
            sx={{
              display: { xs: 'flex', sm: 'none' },
              flexGrow: 1
            }}
          >
            <IconButton
              size="large"
              aria-label="appbar menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', sm: 'none' },
              }}
            >
              <MenuItem
                component={Link}
                to="/"
                onClick={handleCloseNavMenu}
              >
                <Typography textAlign="center">
                  Home
                </Typography>
              </MenuItem>
              <MenuItem
                component={Link}
                to="/transactions"
                onClick={handleCloseNavMenu}
              >
                <Typography textAlign="center">
                  Transactions
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <Typography textAlign="center">
                  Logout
                </Typography>
              </MenuItem>
            </Menu>
          </Box>

          <Typography
            variant='h6'
            sx={{
              display: { xs: 'flex', sm: 'none' },
              flexGrow: 1,
              alignItems: 'center',
              columnGap: 0.5
            }}
          >
            <MonetizationOnIcon />
            Budget App
          </Typography>
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' }
            }}
          >
            <Button
              color="inherit"
              component={Link}
              to="/home"
            >
              Home
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/transactions"
            >
              Transactions
            </Button>
            <Button
              color="inherit"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default ResponsiveAppBar