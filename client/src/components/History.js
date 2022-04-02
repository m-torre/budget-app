import React from 'react'
import { useSelector } from 'react-redux'
import {
  Card,
  CardContent,
  Stack,
  Typography
} from '@mui/material'
import HistoryIcon from '@mui/icons-material/History'
import TransactionList from './TransactionList'

const History = () => {
  const transactions = useSelector(state => state)

  return (
    <Card>
      <CardContent>
        <Stack spacing={2} alignItems="center">
          <Typography variant='h4' sx={{ alignItems: "center", display: "flex", columnGap: 1 }}>
            <HistoryIcon fontSize='inherit' />
            History
          </Typography>
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