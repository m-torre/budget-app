require('dotenv').config()

const DATABASE_URI = process.env.NODE_ENV === 'test'
  ? process.env.TEST_DATABASE_URI
  : process.env.DATABASE_URI

const PORT = process.env.PORT || 3001

module.exports = {
  DATABASE_URI,
  PORT
}