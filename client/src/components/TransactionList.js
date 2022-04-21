import React, { useState } from 'react'
import {
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Typography
} from '@mui/material'
import {
  Delete as DeleteIcon,
  Edit as EditIcon
} from '@mui/icons-material'
import EditTransactionModal from './EditTransactionModal'
import DeleteTransactionDialog from './DeleteTransactionDialog'

const Transaction = ({ transaction, options, setOpenModal, setEditId, setOpenDialog, setDeleteId }) => {
  const handleDelete = () => {
    setOpenDialog(true)
    setDeleteId(transaction.id)
  }

  const editTransaction = () => {
    setOpenModal(true)
    setEditId(transaction.id)
  }

  return (
    <TableRow>
      <TableCell align='center'>
        <Typography variant='body1'>
          {transaction.name}
        </Typography>
      </TableCell>
      <TableCell align='center'>
        <Typography variant='body1'>
          {transaction.date}
        </Typography>
      </TableCell>
      <TableCell align='center'>
        <Typography variant='body1'>
          {transaction.category}
        </Typography>
      </TableCell>
      <TableCell align='center'>
        <Typography
          variant='body1'
          style={
            transaction.type === 'income'
            ? {color:"#66bb6a"}
            : {color:"#ef5350"}
          }
        >
          {
            transaction.type === 'income'
            ? `+$${Number(transaction.amount).toFixed(2)}`
            : `-$${Number(transaction.amount).toFixed(2)}`
          }  
        </Typography>
      </TableCell>
      {
        options && (
        <TableCell align='right'>
          <IconButton
            aria-label="edit"
            onClick={() => editTransaction()}
          >
            <EditIcon />
          </IconButton>
        </TableCell>
      )}
      {
        options && (
        <TableCell align='right'>
          <IconButton
            aria-label="delete"
            onClick={handleDelete}
          >
            <DeleteIcon />
          </IconButton>
        </TableCell>
      )}
    </TableRow>
  )
}

const TransactionList = ({ transactions, options }) => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [openModal, setOpenModal] = useState(false)
  const [editId, setEditId] = useState('')
  const [openDialog, setOpenDialog] = useState(false)
  const [deleteId, setDeleteId] = useState('')

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <>
      <TableContainer>
        <Table sx={{width: '90%', margin: 'auto'}}>
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <Typography variant='h6'>
                  Name
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant='h6'>
                  Date
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant='h6'>
                  Category
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant='h6'>
                  Amount
                </Typography>
              </TableCell>
              {
                options && (
                <TableCell align="center" colSpan={2}>
                  <Typography variant='h6'>
                    Options
                  </Typography>
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(transaction => 
                <Transaction
                  key={transaction.id}
                  transaction={transaction}
                  options={options}
                  setOpenModal={setOpenModal}
                  setEditId={setEditId}
                  setOpenDialog={setOpenDialog}
                  setDeleteId={setDeleteId}
                />
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 15, 20]}
        component='div'
        count={transactions.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {
        openModal && (
        <EditTransactionModal
          open={openModal}
          handleClose={() => setOpenModal(false)}
          id={editId}
        />
      )}
      {
        openDialog && (
        <DeleteTransactionDialog
          open={openDialog}
          handleClose={() => setOpenDialog(false)}
          id={deleteId}
        />
      )}
    </>
  )
}

export default TransactionList