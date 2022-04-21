import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { modifyTransaction } from '../reducers/transactionReducer'
import { makeStyles } from '@mui/styles'
import { DatePicker } from '@mui/lab'
import {
  Box,
  Button,
  FormControl,
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
  let transaction = useSelector(state => state.transactions.find(transaction => transaction.id === id))

  const [category, setCategory] = useState(transaction.category)

  const dateParts = transaction.date.split('/')
  const [selectedDate, setSelectedDate] = useState(new Date(dateParts[2], dateParts[1] - 1, dateParts[0]))

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate)
  }

  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()

  const editTransaction = (event) => {
    event.preventDefault()
  
    const content = {
      name: event.target.name.value,
      amount: Number(event.target.amount.value),
      date: selectedDate.toLocaleDateString(),
      category: category,
      id: id
    }

    dispatch(modifyTransaction(id, content))
    enqueueSnackbar('Transaction edited', { 
      variant: 'success',
    })

    handleClose()
  }

  const classes = useStyles()

  const incomeCategories = [
    "Paycheck",
    "Bonus",
    "Rental Income",
    "Investment",
    "Interest Income",
    "Reimbursement",
    "Miscellaneous"
  ]

  const expenseCategories = [
    "Food",
    "Housing",
    "Bills & Utilities",
    "Transportation",    
    "Medical & Healthcare",
    "Insurance",
    "Personal Care",
    "Entertainment",
    "Education",
    "Shopping",
    "Miscellaneous"
  ]

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
            alignItems: "center"
          }}
        >
          <TextField
            name='name'
            label='Name'
            defaultValue={transaction.name}
            required={true}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <FormControl sx={{ marginBottom: 2 }} fullWidth>
            <InputLabel id="category-select-label">Category</InputLabel>
            <Select
              labelId="category-select-label"
              id="category-select"
              value={category}
              label="Category"
              autoWidth={true}
              onChange={(event) => setCategory(event.target.value)}
              fullWidth
            >
              {
                transaction.type === "expense"
                ? expenseCategories.map(category => <MenuItem value={category} key={category}>{category}</MenuItem>)
                : incomeCategories.map(category => <MenuItem value={category} key={category}>{category}</MenuItem>)
              }
            </Select>
          </FormControl>
          <DatePicker
            label="Date"
            value={selectedDate}
            onChange={handleDateChange}
            renderInput={(params) =>
              <TextField {...params} fullWidth sx={{ marginBottom: 2 }} />
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
            sx={{ marginBottom: 2 }}
          />
          <Button
            variant='contained'
            color='primary'
            type='submit'
            fullWidth
          >
            Edit
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default EditTransactionModal