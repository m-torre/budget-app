import React from 'react'
import Container from '@mui/material/Container'
import Balance from './Balance'
import History from './History'

const Home = () => {
  return (
    <Container
      component="main"
      maxWidth="md"
      sx={{ paddingBottom: 10.5 }}
    >
      <Balance />
      <History />
    </Container>
  )
}

export default Home