import React from 'react'
import useTransactions from '../hooks/useTransactions'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText
} from '@mui/material'
import { useSnackbar } from 'notistack'

const DeleteTransactionDialog = ({ open, handleClose, id }) => {
  const transactions = useTransactions()
  const { enqueueSnackbar } = useSnackbar()

  const handleAgree = () => {
    transactions.remove(id)
    enqueueSnackbar('Transaction deleted', { 
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
          Delete this transaction?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAgree}>OK</Button>
        <Button onClick={handleDisagree}>Cancel</Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteTransactionDialog