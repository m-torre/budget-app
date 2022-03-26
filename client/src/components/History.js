import React from 'react'
import { useSelector } from 'react-redux'
import {
  Card,
  CardContent,
  Stack,
  Typography
} from '@mui/material'
import TransactionList from './TransactionList'

const History = () => {
  const transactions = useSelector(state => state)

  return (
    <Card>
      <CardContent>
        <Stack spacing={2}>
          <Typography variant='h4' align='center'>History</Typography>
          {
            transactions.length > 0
            ? <TransactionList transactions={transactions} options={false}/>
            : <Typography variant='body1' align='center'>No transactions yet</Typography>
          }
        </Stack>
      </CardContent>
    </Card>
  )
}

export default History