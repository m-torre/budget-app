const router = require('express').Router()

const { request } = require('express')
const { Transaction } = require('../models')

const transactionFinder = async (req, res, next) => {
  req.transaction = await Transaction.findByPk(req.params.id)
  next()
}

router.get('/', async (req, res) => {
  const transactions = await Transaction.findAll()
  res.json(transactions)
})

router.post('/', async (req, res) => {
  try {
    const transaction = await Transaction.create(req.body)
    res.json(transaction)
  } catch(error) {
    return res.status(400).json({ error })
  }
})

router.get('/:id', transactionFinder, async (req, res) => {
  if (req.transaction) {
    res.json(req.transaction)
  } else {
    res.status(404).end()
  }
})

router.delete('/:id', transactionFinder, async (req, res) => {
  if (req.transaction) {
    await req.transaction.destroy()
  }
  res.status(204).end()
})

router.put('/:id', transactionFinder, async (req, res) => {
  if (req.transaction) {
    await req.transaction.update({
      name: req.body.name,
      amount: req.body.amount,
      date: req.body.date
    })
    await req.transaction.save()
    res.json(req.transaction)
  } else {
    res.status(404).end()
  }
})

module.exports = router