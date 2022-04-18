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
import { useSnackbar } from 'notistack'
import CloseIcon from '@mui/icons-material/Close'

const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: '290px',
    height: '290px',
    left: '50%',
    top: '50%',
    marginLeft: '-145px',
    marginTop: '-145px',
    backgroundColor: theme.palette.background.paper,
    borderRadius: '10px'
  },
  closeButton: {
    float: 'right'
  },
  form: {
    width: '260px',
    margin: 'auto'
  },
  formElement: {
    paddingRight: '8px'
  }
}))

const EditTransactionModal = ({ open, handleClose, id }) => {
  let transaction = useSelector(state => state.transactions.find(transaction => transaction.id === id))

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
      id: id
    }
    
    event.target.name.value = ''
    event.target.amount.value = ''

    dispatch(modifyTransaction(id, content))
    enqueueSnackbar('Transaction edited', { 
      variant: 'success',
    })

    handleClose()
  }

  const classes = useStyles()

  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
      <Modal open={open}>
        <Box className={classes.modal}>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            className={classes.closeButton}
          >
            <CloseIcon />
          </IconButton>
          <form onSubmit={editTransaction}>
            <Grid
              container
              spacing={1}
              direction='column'
              className={classes.form}
            >
              <Grid item>
                <TextField
                  name='name'
                  label='Name'
                  defaultValue={transaction.name}
                  required={true}
                  fullWidth
                  className={classes.formElement}
                />
              </Grid>
              <Grid item>
                <DatePicker
                  label="Date"
                  value={selectedDate}
                  onChange={handleDateChange}
                  renderInput={(params) =>
                    <TextField {...params} fullWidth className={classes.formElement} />
                  }
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
                  fullWidth
                  className={classes.formElement}
                />
              </Grid>
              <Grid item>
                <Button
                  variant='contained'
                  color='primary'
                  type='submit'
                >
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