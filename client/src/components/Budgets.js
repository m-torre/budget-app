import React from 'react'
import useBudgets from '../hooks/useBudgets'
import {
  Card,
  CardContent,
  Container,
  Typography
} from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import BudgetForm from './BudgetForm'
import BudgetCard from './BudgetCard'

const Budgets = () => {
  const budgets = useBudgets()

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
      <Card>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2
          }}
        >
          <Typography
            variant='h4'
            sx={{
              display: "flex",
              alignItems: "center",
              columnGap: 1
            }}
          >
            <AddCircleOutlineIcon fontSize='inherit' />
            Add budget
          </Typography>
          <BudgetForm />
        </CardContent>
      </Card>
      {budgets.list.map(budget => <BudgetCard key={budget.category} category={budget.category} />)}
    </Container>
  )
}

export default Budgets