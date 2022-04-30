import React, { useState } from 'react'
import useTransactions from '../hooks/useTransactions'
import { makeStyles } from '@mui/styles'
import { DatePicker } from '@mui/lab'
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField
} from '@mui/material'
import { useSnackbar } from 'notistack'
import CloseIcon from '@mui/icons-material/Close'

const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: theme.palette.background.paper,
    borderRadius: "4px",
    display: "flex",
    flexDirection: "column",
    padding: 16
  }
}))

const EditTransactionModal = ({ open, handleClose, id }) => {
  const transactions = useTransactions()
  const transaction = transactions.find(id)

  const [name, setName] = useState(transaction.name)
  const [category, setCategory] = useState(transaction.category)

  const [selectedDate, setSelectedDate] = useState(new Date(transaction.date))

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate)
  }

  const { enqueueSnackbar } = useSnackbar()

  const editTransaction = (event) => {
    event.preventDefault()
  
    const content = {
      name,
      amount: Number(event.target.amount.value),
      date: selectedDate,
      category,
      id
    }

    transactions.modify(id, content)
    enqueueSnackbar('Transaction edited', { 
      variant: 'success',
    })

    handleClose()
  }

  const classes = useStyles()

  const incomeCategories = transactions.getIncomeCategories()
  const expensesCategories = transactions.getExpensesCategories()

  const isValidName = () => {
    const nameFormat = /^([a-zA-Z0-9\s])*$/
    if (nameFormat.test(name) && name.length > 1) return true
    return false
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <Box className={classes.modal}>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            alignSelf: "flex-end",
            marginBottom: 1
          }}
        >
          <CloseIcon />
        </IconButton>
        <Box
          component="form"
          onSubmit={editTransaction}
          sx={{
            alignSelf: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2
          }}
        >
          <TextField
            name='name'
            value={name}
            onChange={({ target }) => setName(target.value)}
            label='Name'
            required={true}
            error={!isValidName()}
            fullWidth
          />
          {!isValidName() && (
          <FormHelperText error>The name must be at least 2 characters long.</FormHelperText>
          )}
          <FormControl fullWidth>
            <InputLabel id="category-select-label">Category</InputLabel>
            <Select
              labelId="category-select-label"
              id="category-select"
              value={category}
              label="Category"
              onChange={(event) => setCategory(event.target.value)}
              fullWidth
            >
              {
                transaction.type === "expense"
                ? expensesCategories.map(category => <MenuItem value={category} key={category}>{category}</MenuItem>)
                : incomeCategories.map(category => <MenuItem value={category} key={category}>{category}</MenuItem>)
              }
            </Select>
          </FormControl>
          <DatePicker
            label="Date"
            value={selectedDate}
            onChange={handleDateChange}
            renderInput={(params) =>
              <TextField {...params} fullWidth />
            }
          />
          <TextField
            name='amount'
            label='Amount'
            type='number'
            defaultValue={transaction.amount}
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
            disabled={!isValidName()}
          >
            Edit
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default EditTransactionModal