import React from 'react'
import useTransactions from '../hooks/useTransactions'
import {
  Card,
  CardContent,
  Container,
  Typography
} from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { GiReceiveMoney, GiPayMoney } from 'react-icons/gi'
import TransactionForm from './TransactionForm'
import TransactionList from './TransactionList'

const Transactions = () => {
  const transactions = useTransactions()

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
              columnGap: 1,
            }}
          >
            <AddCircleOutlineIcon fontSize='inherit' />
            Add transaction
          </Typography>
          <TransactionForm />
        </CardContent>
      </Card>
      <Card>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <Typography
            variant='h4'
            sx={{
              display: "flex",
              alignItems: "center",
              columnGap: 1,
              marginBottom: 2
            }}
          >
            <GiReceiveMoney />
            Income
          </Typography>
          {
            transactions.income.length > 0
            ? <TransactionList transactions={transactions.income} options={true}/>
            : <Typography variant='body1' align='center'>No income yet</Typography>
          }
        </CardContent>
      </Card>
      <Card>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <Typography
            variant='h4'
            sx={{
              display: "flex",
              alignItems: "center",
              columnGap: 1,
              marginBottom: 2
            }}
          >
            <GiPayMoney />
            Expenses
          </Typography>  
          {
            transactions.expenses.length > 0
            ? <TransactionList transactions={transactions.expenses} options={true}/>
            : <Typography variant='body1' align='center'>No expenses yet</Typography>
          }
        </CardContent>
      </Card>
    </Container>
  )
}

export default Transactions