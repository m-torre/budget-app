const cors = require('cors')
const path = require('path')
const express = require('express')
const app = express()

const { PORT } = require('./utils/config')
const { connectToDatabase } = require('./utils/db')

const transactionsRouter = require('./controllers/transactions')

app.use(express.static(path.resolve(__dirname, '../client/build')))
app.use(express.json())
app.use(cors())

app.use('/api/transactions', transactionsRouter)

app.get('/transactions', function (req, res) {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'))
})

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'Unknown endpoint' })
}

app.use(unknownEndpoint)

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()