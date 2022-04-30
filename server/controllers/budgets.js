const jwt = require('jsonwebtoken')
const router = require('express').Router()

const { request } = require('express')
const { Budget, User } = require('../models')

router.get('/', async (req, res) => {
  const budgets = await Budget.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['name']
    }
  })
  res.json(budgets)
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
    const budget = await Budget.create({ ...req.body, userId: user.id })
    delete budget.dataValues.userId
    budget.dataValues.user = { name: user.name }
    res.status(201).json(budget)
  } catch(error) {
    return res.status(400).json({ error })
  }
})

const budgetFinder = async (req, res, next) => {
  if (Number.isInteger(Number(req.params.id)))
  {
    req.budget = await Budget.findByPk(req.params.id)
    next()
  }
  else {
    res.status(400).end()
  }
}

router.get('/:id', budgetFinder, async (req, res) => {
  if (req.budget) {
    res.json(req.budget)
  } else {
    res.status(404).end()
  }
})

router.put('/:id', tokenExtractor, budgetFinder, async (req, res) => {
  if (req.budget) {
    try {
      await req.budget.update({
        amount: req.body.amount
      })
      await req.budget.save()
      res.json(req.budget)
    } catch(error) {
      return res.status(400).json({ error })
    }
  } else {
    res.status(404).end()
  }
})

router.delete('/:id', tokenExtractor, budgetFinder, async (req, res) => {
  if (req.budget) {
    await req.budget.destroy()
  }
  res.status(204).end()
})

module.exports = router