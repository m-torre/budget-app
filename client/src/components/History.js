import React from 'react'
import useTransactions from '../hooks/useTransactions'
import {
  Card,
  CardContent,
  Typography
} from '@mui/material'
import HistoryIcon from '@mui/icons-material/History'
import TransactionList from './TransactionList'

const History = () => {
  const transactions = useTransactions()

  return (
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
            }}>
          <HistoryIcon fontSize='inherit' />
          History
        </Typography>
        {
          transactions.list.length > 0
          ? <TransactionList transactions={transactions.list} options={false}/>
          : <Typography variant='body1' align='center'>No transactions yet</Typography>
        }
      </CardContent>
    </Card>
  )
}

export default History