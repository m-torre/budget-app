import React, { useState } from 'react'
import useBudgets from '../hooks/useBudgets'
import useTransactions from '../hooks/useTransactions'
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@mui/material'
import { useSnackbar } from 'notistack'

const BudgetForm = () => {
  const [category, setCategory] = useState('')
  const transactions = useTransactions()
  const budgets = useBudgets()
  const { enqueueSnackbar } = useSnackbar()

  const isValidCategory = () => {
    let valid = true

    budgets.list.forEach(budget => {
      if (JSON.stringify(budget.category) === JSON.stringify(category)) {
        valid = false
        return
      }
    })

    return valid
  }
  
  const addTransaction = (event) => {
    event.preventDefault()

    const content = {
      category: category,
      amount: Number(event.target.amount.value),
    }

    event.target.amount.value = ''
    setCategory('')

    budgets.create(content)
    enqueueSnackbar('Budget added', { 
      variant: 'success',
    })
  }

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
          error={!isValidCategory()}
        >
          {expensesCategories.map(category => <MenuItem value={category} key={category}>{category}</MenuItem>)}
        </Select>
        {!isValidCategory() && (
        <FormHelperText error>There is already a budget for this category.</FormHelperText>
        )}
      </FormControl>
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
        disabled={!isValidCategory()}
      >
        Add
      </Button>
    </Box>
  )
}

export default BudgetForm