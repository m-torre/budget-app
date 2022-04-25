const cors = require('cors')
const path = require('path')
const express = require('express')
const app = express()

const { PORT } = require('./utils/config')
const { connectToDatabase } = require('./utils/db')

const transactionsRouter = require('./controllers/transactions')
const budgetsRouter = require('./controllers/budgets')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

app.use(express.static(path.resolve(__dirname, '../client/build')))
app.use(express.json())
app.use(cors())

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

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()