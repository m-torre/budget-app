import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { modifyTransaction } from '../reducers/transactionReducer'
import { makeStyles } from '@mui/styles'
import {
  DatePicker,
  LocalizationProvider
} from '@mui/lab'
import DateAdapter from '@mui/lab/AdapterDateFns'
import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Modal,
  TextField
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: '290px',
    height: '290px',
    left: '50%',
    top: '50%',
    marginLeft: '-145px',
    marginTop: '-135px',
    backgroundColor: theme.palette.background.paper,
    borderRadius: '10px'
  },
  closeButton: {
    float: 'right'
  },
  form: {
    marginLeft: '6px'
  }
}))

const EditTransactionModal = ({ open, handleClose, id }) => {
  let transaction = useSelector(state => state.find(transaction => transaction.id === id))
  if (transaction === undefined) {
    const dateNow = new Date()
    
    transaction = {
      name: '',
      amount: 0,
      date: dateNow
    }
  }

  const [selectedDate, setSelectedDate] = useState(transaction.date)

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate)
  }

  const dispatch = useDispatch()

  const classes = useStyles()

  const editTransaction = (event) => {
    event.preventDefault()
  
    const content = {
      name: event.target.name.value,
      amount: Number(event.target.amount.value),
      date: selectedDate.toLocaleDateString(),
      id: id
    }
    
    event.target.name.value = ''
    event.target.amount.value = ''

    dispatch(modifyTransaction(id, content))

    handleClose()
  }
  
  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
      <Modal open={open} >
        <Box className={classes.modal}>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            className={classes.closeButton}
          >
            <CloseIcon />
          </IconButton>
          <form onSubmit={editTransaction}>
            <Grid container spacing={1} direction='column' className={classes.form}>
              <Grid item>
                <TextField name='name' label='Name' defaultValue={transaction.name} required={true} />
              </Grid>
              <Grid item>
                <DatePicker
                  label="Date"
                  value={selectedDate}
                  onChange={handleDateChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Grid>
              <Grid item>
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
                />
              </Grid>
              <Grid item>
                <Button variant='contained' color='primary' type='submit'>
                  Edit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Modal>
    </LocalizationProvider>
  )
}

export default EditTransactionModal