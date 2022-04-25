import React from 'react'
import useBudgets from '../hooks/useBudgets'
import useTransactions from '../hooks/useTransactions'
import useProgressBar from '../hooks/useProgressBar'
import useModal from '../hooks/useModal'
import { getAmount } from '../utils'
import {
  Box,
  Card,
  CardContent,
  IconButton,
  LinearProgress,
  Typography
} from '@mui/material'
import {
  Delete as DeleteIcon,
  Edit as EditIcon
} from '@mui/icons-material'
import { GiPiggyBank } from 'react-icons/gi'
import TransactionList from './TransactionList'
import EditBudgetModal from './EditBudgetModal'
import DeleteBudgetDialog from './DeleteBudgetDialog'

const BudgetCard = ({ category }) => {
  const budgets = useBudgets()
  const budget = budgets.find(category)
  const transactions = useTransactions()
  const spent = Math.abs(getAmount(transactions.filterCategory(category))).toFixed(2)
  const barControl = useProgressBar(spent, budget.amount)
  const editModalControl = useModal()
  const deleteDialogControl = useModal()

  const handleEdit = () => {
    editModalControl.openModal()
    editModalControl.setTargetId(budget.category)
  }

  const handleDelete = () => {
    deleteDialogControl.openModal()
    deleteDialogControl.setTargetId(budget.id)
  }

  return (
    <Card>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Typography
          variant='h4'
          sx={{
            display: "flex",
            alignItems: "center",
            columnGap: 1,
            marginBottom: 2
          }}
        >
          <GiPiggyBank />
          {category}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            marginBottom: 2
          }}
        >
          <IconButton
            aria-label="edit"
            onClick={handleEdit}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            aria-label="delete"
            onClick={handleDelete}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            marginBottom: 2
          }}
        >
          <Typography
            variant="h6"
            align="center"
          >
            ${spent}
          </Typography>
          <Typography
            variant="h5"
            align="center"
          >
            &nbsp;/ ${budget.amount.toFixed(2)}
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={barControl.getProgressBarValue()}
          color={barControl.getProgressBarColor()}
          sx={{
            width: '80%',
            marginBottom: 2
          }}
        />
        {
          transactions.filterCategory(category).length > 0
          ? <TransactionList transactions={transactions.filterCategory(category)} options={false}/>
          : <Typography variant='body1' align='center'>No transactions yet</Typography>
        }
      </CardContent>
      {
        editModalControl.getOpenStatus() && (
        <EditBudgetModal
          open={editModalControl.getOpenStatus()}
          handleClose={editModalControl.closeModal}
          category={editModalControl.getTargetId()}
        />
      )}
      {
        deleteDialogControl.getOpenStatus() && (
        <DeleteBudgetDialog
          open={deleteDialogControl.getOpenStatus()}
          handleClose={deleteDialogControl.closeModal}
          id={deleteDialogControl.getTargetId()}
        />
      )}
    </Card>
  )
}

export default BudgetCard