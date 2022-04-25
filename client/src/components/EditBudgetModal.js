import React from 'react'
import useBudgets from '../hooks/useBudgets'
import { makeStyles } from '@mui/styles'
import {
  Box,
  Button,
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

const EditBudgetModal = ({ open, handleClose, category }) => {
  const budgets = useBudgets()
  const budget = budgets.find(category)

  const { enqueueSnackbar } = useSnackbar()

  const editBudget = (event) => {
    event.preventDefault()

    const content = {
      amount: Number(event.target.amount.value)
    }

    budgets.modify(budget.id, content)
    enqueueSnackbar('Budget edited', { 
      variant: 'success',
    })

    handleClose()
  }

  const classes = useStyles()

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
          onSubmit={editBudget}
          sx={{
            alignSelf: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2
          }}
        >
          <TextField
            name='amount'
            label='Amount'
            type='number'
            defaultValue={budget.amount}
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
            Edit
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default EditBudgetModal