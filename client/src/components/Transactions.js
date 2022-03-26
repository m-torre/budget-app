import React from 'react'
import { useSelector } from 'react-redux'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DateAdapter from '@mui/lab/AdapterDateFns'
import {
  Card,
  CardContent,
  Stack,
  Typography } from '@mui/material'
import TransactionForm from './TransactionForm'
import TransactionList from './TransactionList'

const Transactions = () => {
  const income = useSelector(state => state.filter(transaction => transaction.type === 'income'))
  const expenses = useSelector(state => state.filter(transaction => transaction.type === 'expense'))

  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
      <Stack spacing={2}>
          <Card>
            <CardContent>
              <TransactionForm />
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <Stack spacing={2}>
                <Typography variant='h4' align='center'>Income</Typography>
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
              <Stack spacing={2}>
                <Typography variant='h4' align='center'>Expenses</Typography>  
                {
                  expenses.length > 0
                  ? <TransactionList transactions={expenses} options={true}/>
                  : <Typography variant='body1' align='center'>No expenses yet</Typography>
                }
              </Stack>
            </CardContent>
          </Card>
      </Stack>
    </LocalizationProvider>
  )
}

export default Transactions