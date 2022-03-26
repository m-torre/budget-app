const cors = require('cors')
const express = require('express')
const app = express()

const { PORT } = require('./utils/config')
const { connectToDatabase } = require('./utils/db')

const transactionsRouter = require('./controllers/transactions')

app.use(express.static('build'))
app.use(express.json())
app.use(cors())

app.use('/api/transactions', transactionsRouter)

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()