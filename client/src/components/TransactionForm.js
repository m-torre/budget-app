import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createTransaction } from '../reducers/transactionReducer'
import { makeStyles } from '@mui/styles'
import DatePicker from '@mui/lab/DatePicker'
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputAdornment,
  Radio,
  RadioGroup,
  Stack,
  Typography,
  TextField
} from '@mui/material'

const TransactionForm = () => {
  const [type, setType] = useState('income')
  const [selectedDate, setSelectedDate] = useState(new Date())
  
  const dispatch = useDispatch()

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate)
  }
  
  const addTransaction = (event) => {
    event.preventDefault()
  
    const content = {
      name: event.target.name.value,
      amount: Number(event.target.amount.value),
      date: selectedDate.toLocaleDateString(),
      type: type
    }
    
    event.target.name.value = ''
    event.target.amount.value = ''

    dispatch(createTransaction(content))
  }

  const useStyles = makeStyles((theme) => ({
    income: {
      '&$checked': {
        color: '#66bb6a' 
      }
    },
    expense: {
      '&$checked': {
        color: '#ef5350' 
      }
    },
    checked: {}
  }))

  const classes = useStyles()

  return (
    <>
      <Stack spacing={2}>
        <Typography variant='h4' align='center'>Add transaction</Typography>
        <Stack spacing={1} alignItems="flex-start">
          <FormControl>
            <FormLabel id="type-radio-buttons-group-label">Type</FormLabel>
            <RadioGroup
              aria-labelledby="type-radio-buttons-group-label"
              defaultValue="income"
              name="radio-buttons-group"
              onChange={(event) => setType(event.target.value)}
            >
              <FormControlLabel
                value="income"
                control={<Radio classes={{root: classes.income, checked: classes.checked}}/>}
                label="Income"
              />
              <FormControlLabel
                value="expense"
                control={<Radio classes={{root: classes.expense, checked: classes.checked}}/>}
                label="Expense"
              />
            </RadioGroup>
          </FormControl>
          <DatePicker
              label="Date"
              value={selectedDate}
              onChange={handleDateChange}
              renderInput={(params) => <TextField {...params} />}
            />
          <form onSubmit={addTransaction}>
            <Stack spacing={1}>
                <TextField name='name' label='Name' required={true} />
                <TextField
                  name='amount'
                  label='Amount'
                  type='number'
                  required={true}
                  inputProps={{
                    step:'0.01'
                  }}
                  InputProps={{
                    startAdornment: <InputAdornment position='start'>$</InputAdornment>,
                  }}
                />
                <Button variant='contained' color='primary' type='submit'>
                  Add
                </Button>
            </Stack>
          </form>
        </Stack>
      </Stack>
    </>
  )
}

export default TransactionForm