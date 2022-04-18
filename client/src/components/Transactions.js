import React from 'react'
import { useSelector } from 'react-redux'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DateAdapter from '@mui/lab/AdapterDateFns'
import {
  Card,
  CardContent,
  Container,
  Stack,
  Typography
} from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { GiReceiveMoney, GiPayMoney } from 'react-icons/gi'
import TransactionForm from './TransactionForm'
import TransactionList from './TransactionList'

const Transactions = () => {
  const user = useSelector(state => state.user)
  const transactions = useSelector(state => state.transactions.filter(transaction => transaction.user.name === user.name))
  const income = transactions.filter(transaction => transaction.type === 'income')
  const expenses = transactions.filter(transaction => transaction.type === 'expense')

  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
      <Container
        component="main"
        maxWidth="md"
        sx={{ paddingBottom: 10.5 }}
      >
        <Stack spacing={2}>
            <Card>
              <CardContent>
                <Stack spacing={2} alignItems="center">
                  <Typography variant='h4' sx={{ alignItems: "center", display: "flex", columnGap: 1 }}>
                    <AddCircleOutlineIcon fontSize='inherit' />
                    Add transaction
                  </Typography>
                  <TransactionForm />
                </Stack>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <Stack spacing={2} alignItems="center">
                  <Typography variant='h4' sx={{ alignItems: "center", display: "flex", columnGap: 1 }}>
                    <GiReceiveMoney />
                    Income
                  </Typography>
                  {
                    income.length > 0
                    ? <TransactionList transactions={income} options={true}/>
                    : <Typography variant='body1' align='center'>No income yet</Typography>
                  }
                </Stack>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <Stack spacing={2} alignItems="center">
                  <Typography variant='h4' sx={{ alignItems: "center", display: "flex", columnGap: 1 }}>
                    <GiPayMoney />
                    Expenses
                  </Typography>  
                  {
                    expenses.length > 0
                    ? <TransactionList transactions={expenses} options={true}/>
                    : <Typography variant='body1' align='center'>No expenses yet</Typography>
                  }
                </Stack>
              </CardContent>
            </Card>
        </Stack>
      </Container>
    </LocalizationProvider>
  )
}

export default Transactions