const jwt = require('jsonwebtoken')
const router = require('express').Router()

const { request } = require('express')
const { Transaction, User } = require('../models')

router.get('/', async (req, res) => {
  const transactions = await Transaction.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['name']
    }
  })
  res.json(transactions)
})

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), process.env.SECRET)
      next()
    } catch{
      res.status(401).json({ error: 'Token invalid' })
    }
  } else {
    res.status(401).json({ error: 'Token missing' })
  }
}

router.post('/', tokenExtractor, async (req, res) => {
  try {
    const user = await User.findByPk(req.decodedToken.id)
    const transaction = await Transaction.create({ ...req.body, userId: user.id })
    delete transaction.dataValues.userId
    transaction.dataValues.user = { name: user.name }
    res.status(201).json(transaction)
  } catch(error) {
    return res.status(400).json({ error })
  }
})

const transactionFinder = async (req, res, next) => {
  if (Number.isInteger(Number(req.params.id)))
  {
    req.transaction = await Transaction.findByPk(req.params.id)
    next()
  }
  else {
    res.status(400).end()
  }
}

router.get('/:id', transactionFinder, async (req, res) => {
  if (req.transaction) {
    res.json(req.transaction)
  } else {
    res.status(404).end()
  }
})

router.put('/:id', tokenExtractor, transactionFinder, async (req, res) => {
  if (req.transaction) {
    try {
      await req.transaction.update({
        name: req.body.name,
        amount: req.body.amount,
        date: req.body.date,
        category: req.body.category
      })
      await req.transaction.save()
      res.json(req.transaction)
    } catch(error) {
      return res.status(400).json({ error })
    }
  } else {
    res.status(404).end()
  }
})

router.delete('/:id', tokenExtractor, transactionFinder, async (req, res) => {
  if (req.transaction) {
    await req.transaction.destroy()
  }
  res.status(204).end()
})

module.exports = router