import React from 'react'
import { useSelector } from 'react-redux'
import {
  Card,
  CardContent,
  Typography
} from '@mui/material'
import HistoryIcon from '@mui/icons-material/History'
import TransactionList from './TransactionList'

const History = () => {
  const user = useSelector(state => state.user)
  const transactions = useSelector(state => state.transactions.filter(transaction => transaction.user.name === user.name))

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
          transactions.length > 0
          ? <TransactionList transactions={transactions} options={false}/>
          : <Typography variant='body1' align='center'>No transactions yet</Typography>
        }
      </CardContent>
    </Card>
  )
}

export default History