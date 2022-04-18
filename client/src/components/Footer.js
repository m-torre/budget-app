import React from 'react'
import {
  Link,
  Paper,
  Typography
} from '@mui/material'

const Copyright = () => (
  <Typography
    variant="body2"
    color="text.secondary"
    align="center"
  >
    {'Copyright © '}
    <Link
      color="inherit"
      href="https://mtorre.dev/"
    >
      Maximiliano Torre
    </Link>{' '}
    {new Date().getFullYear()}
    {'.'}
  </Typography>
)

const Footer = () => (
  <Paper
    component="footer"
    sx={{
      position: "absolute",
      bottom: 0,
      width: "100%",
      padding: 3
    }}
  >
    <Copyright />
  </Paper>
)

export default Footer