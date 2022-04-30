const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')

const transactionsRouter = require('./controllers/transactions')
const budgetsRouter = require('./controllers/budgets')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

app.use(cors())
app.use(express.static(path.resolve(__dirname, '../client/build')))
app.use(express.json())

app.use('/api/transactions', transactionsRouter)
app.use('/api/budgets', budgetsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'Unknown endpoint' })
}

app.use('/api/*', unknownEndpoint)

app.get('/*', function (req, res) {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'))
})

module.exports = app