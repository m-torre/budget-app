import React from 'react'
import Stack from '@mui/material/Stack'
import Balance from './Balance'
import History from './History'

const Home = () => {
  return (
    <Stack spacing={2}>
        <Balance />
        <History />
    </Stack>
  )
}

export default Home