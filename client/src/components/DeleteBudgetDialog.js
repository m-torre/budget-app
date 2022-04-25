import React from 'react'
import useBudgets from '../hooks/useBudgets'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText
} from '@mui/material'
import { useSnackbar } from 'notistack'

const DeleteBudgetDialog = ({ open, handleClose, id }) => {
  const budgets = useBudgets()
  const { enqueueSnackbar } = useSnackbar()

  const handleAgree = () => {
    budgets.remove(id)
    enqueueSnackbar('Budget deleted', { 
      variant: 'success',
    })
    handleClose()
  }

  const handleDisagree = () => {
    handleClose()
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>
        <DialogContentText>
          Delete this budget?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAgree}>OK</Button>
        <Button onClick={handleDisagree}>Cancel</Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteBudgetDialog