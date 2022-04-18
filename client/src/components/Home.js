import React from 'react'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Balance from './Balance'
import History from './History'

const Home = () => {
  return (
    <Container
      component="main"
      maxWidth="md"
      sx={{ paddingBottom: 10.5 }}
    >
      <Stack spacing={2}>
          <Balance />
          <History />
      </Stack>
    </Container>
  )
}

export default Home