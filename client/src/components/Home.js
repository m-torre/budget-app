import React from 'react'
import Container from '@mui/material/Container'
import Balance from './Balance'
import BudgetsStepper from './BudgetsStepper'
import History from './History'

const Home = () => {
  return (
    <Container
      component="main"
      maxWidth="md"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 2,
        paddingBottom: 10.5
      }}
    >
      <Balance />
      <BudgetsStepper />
      <History />
    </Container>
  )
}

export default Home