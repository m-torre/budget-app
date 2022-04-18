const Transaction = require('./transaction')
const User = require('./user')

User.hasMany(Transaction)
Transaction.belongsTo(User)
User.sync({ alter: true })
Transaction.sync({ alter: true })

module.exports = {
  Transaction, User
}