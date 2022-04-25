import React, { useState } from 'react'
import useTransactions from '../hooks/useTransactions'
import { makeStyles } from '@mui/styles'
import DatePicker from '@mui/lab/DatePicker'
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputAdornment,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField
} from '@mui/material'
import { useSnackbar } from 'notistack'

const TransactionForm = () => {
  const [type, setType] = useState('income')
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [category, setCategory] = useState('')
  
  const transactions = useTransactions()
  const { enqueueSnackbar } = useSnackbar()

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate)
  }
  
  const addTransaction = (event) => {
    event.preventDefault()

    const content = {
      name: event.target.name.value,
      amount: Number(event.target.amount.value),
      date: selectedDate.toLocaleDateString(),
      type: type,
      category: category
    }

    event.target.name.value = ''
    event.target.amount.value = ''
    setCategory('')
    setSelectedDate(new Date())

    transactions.create(content)
    enqueueSnackbar('Transaction added', { 
      variant: 'success',
    })
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

  const incomeCategories = transactions.getIncomeCategories()
  const expensesCategories = transactions.getExpensesCategories()

  return (
    <Box
      component="form"
      onSubmit={addTransaction}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2
      }}
    >
      <FormControl>
        <FormLabel
          id='type-radio-buttons-group-label'
          sx={{ margin: 'auto' }}
        >
          Type
        </FormLabel>
        <RadioGroup
          aria-labelledby='type-radio-buttons-group-label'
          defaultValue='income'
          name='type-radio-buttons-group'
          onChange={(event) => setType(event.target.value)}
        >
          <FormControlLabel
            value='income'
            control={<Radio classes={{root: classes.income, checked: classes.checked}}/>}
            label='Income'
          />
          <FormControlLabel
            value='expense'
            control={<Radio classes={{root: classes.expense, checked: classes.checked}}/>}
            label='Expense'
          />
        </RadioGroup>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="category-select-label">Category</InputLabel>
        <Select
          labelId="category-select-label"
          id="category-select"
          value={category}
          label="Category"
          required={true}
          onChange={(event) => setCategory(event.target.value)}
          fullWidth
        >
          {
            type === "expense"
            ? expensesCategories.map(category => <MenuItem value={category} key={category}>{category}</MenuItem>)
            : incomeCategories.map(category => <MenuItem value={category} key={category}>{category}</MenuItem>)
          }
        </Select>
      </FormControl>
      <DatePicker
        label='Date'
        value={selectedDate}
        onChange={handleDateChange}
        renderInput={(params) => <TextField {...params} fullWidth />}
      />
      <TextField
        name='name'
        label='Name'
        required={true}
        fullWidth
      />
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
        fullWidth
      />
      <Button
        variant='contained'
        color='primary'
        type='submit'
        fullWidth
      >
        Add
      </Button>
    </Box>
  )
}

export default TransactionForm