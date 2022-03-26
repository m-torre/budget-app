import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteTransaction } from '../reducers/transactionReducer'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText
} from '@mui/material'

const DeleteTransactionDialog = ({ open, handleClose, id }) => {
  const dispatch = useDispatch()
  
  const handleAgree = () => {
    dispatch(deleteTransaction(id))
    handleClose()
  }

  const handleDisagree = () => {
    handleClose()
  }
  
  return (
    <Dialog open={open} onClose={handleClose} >
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