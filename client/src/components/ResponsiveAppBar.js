import React, { useState } from 'react'
import { Link } from 'react-router-dom'
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

  return (
    <AppBar position="static">
      <Container>
        <Toolbar disableGutters>
          <Typography
            variant='h6'
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' }, alignItems: 'center' }}
          >
            <MonetizationOnIcon />
            Budget App
          </Typography>
          <Box
            sx={{ flexGrow: 1, display: { xs: 'flex', sm: 'none' } }}
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
              <MenuItem component={Link} to="/" onClick={handleCloseNavMenu}>
                <Typography textAlign="center">
                  Home
                </Typography>
              </MenuItem>
              <MenuItem component={Link} to="/transactions" onClick={handleCloseNavMenu}>
                <Typography textAlign="center">
                  Transactions
                </Typography>
              </MenuItem>
            </Menu>
          </Box>

          <Typography
            variant='h6'
            sx={{ flexGrow: 1, display: { xs: 'flex', sm: 'none' }, alignItems: 'center' }}
          >
            <MonetizationOnIcon />
            Budget App
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/transactions">
              Transactions
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default ResponsiveAppBar