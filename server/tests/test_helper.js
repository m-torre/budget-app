const Transaction = require('../models/transaction')
const Budget = require('../models/budget')
const User = require('../models/user')

const initialTransactions = [
  {
    name: 'Salary',
    amount: 1000,
    date: '2022-04-28',
    type: 'income',
    category: 'Paycheck'
  },
  {
    name: 'Dinner',
    amount: 17,
    date: '2022-04-28',
    type: 'expense',
    category: 'Food'
  },
  {
    name: 'Gas',
    amount: 22.58,
    date: '2022-04-28',
    type: 'expense',
    category: 'Transportation'
  }
]

const initialBudgets = [
  {
    category: 'Food',
    amount: 100
  },
  {
    category: 'Entertainment',
    amount: 250
  }
]

const transactionsInDb = async () => {
  const transactions = await Transaction.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['name']
    }
  })
  return transactions.map(transaction => transaction.toJSON())
}

const budgetsInDb = async () => {
  const budgets = await Budget.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['name']
    }
  })
  return budgets.map(budget => budget.toJSON())
}

const usersInDb = async () => {
  const users = await User.findAll({})
  return users.map(user => user.toJSON())
}

const nonExistingId = async () => {
  const transaction = await Transaction.create({
    name: 'Side gig',
    amount: 200,
    date: '2022-04-28',
    type: 'income',
    category: 'Miscellaneous'
  })
  await transaction.destroy()

  return transaction.id.toString()
}

module.exports = {
  initialTransactions,
  initialBudgets,
  transactionsInDb,
  budgetsInDb,
  usersInDb,
  nonExistingId
}