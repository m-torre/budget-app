import React from 'react'
import { useSelector } from 'react-redux'
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography
} from '@mui/material'
import { IconContext } from 'react-icons'
import { GiMoneyStack, GiReceiveMoney, GiPayMoney } from 'react-icons/gi'

const Balance = () => {
  const transactions = useSelector(state => state)
  const income = useSelector(state => state.filter(transaction => transaction.type === 'income'))
  const expenses = useSelector(state => state.filter(transaction => transaction.type === 'expense'))

  const getAmount = (transactions) => {
    let amount = 0
    
    if (transactions.length > 0)
    {
      transactions.forEach(transaction => {
        if (transaction.type === 'income')
        {
          amount += Number(transaction.amount)
        }
        else
        {
          amount -= Number(transaction.amount)
        }
      })
    }

    return amount
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Box display="flex" alignItems="center" justifyContent="center">
              <IconContext.Provider value={{ size: '6em', style: { margin: 'auto' } }}>
                <GiMoneyStack />
              </IconContext.Provider>
            </Box>
            <Typography variant='h4' align='center'>
              Your balance
            </Typography>
            <Typography variant='h1' align='center'>
              {
                getAmount(transactions) >= 0
                ? `$${getAmount(transactions).toFixed(2)}`
                : `-$${Math.abs(getAmount(transactions)).toFixed(2)}`
              }
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={6}>
        <Card>
          <CardContent>
            <Box display="flex" alignItems="center" justifyContent="center">
              <IconContext.Provider value={{ size: '4em' }}>
                <GiReceiveMoney />
              </IconContext.Provider>
            </Box>
            <Typography variant='h4' align='center'>
              Income
            </Typography>
            <Typography variant='h5' align='center' style={{color:'#66bb6a'}}>
              +${getAmount(income).toFixed(2)}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={6}>
        <Card>
          <CardContent>
            <Box display="flex" alignItems="center" justifyContent="center">
              <IconContext.Provider value={{ size: '4em' }}>
                <GiPayMoney />
              </IconContext.Provider>
            </Box>
            <Typography variant='h4' align='center'>
              Expenses
            </Typography>
            <Typography variant='h5' align='center' style={{color:'#ef5350'}}>
              -${Math.abs(getAmount(expenses)).toFixed(2)}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default Balance