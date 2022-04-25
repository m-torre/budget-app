const User = require('./user')
const Transaction = require('./transaction')
const Budget = require('./budget')

User.hasMany(Transaction)
User.hasMany(Budget)
Transaction.belongsTo(User)
Budget.belongsTo(User)

const initializeModels = async () => {
  await User.sync({ alter: true })
  await Transaction.sync({ alter: true })
  await Budget.sync({ alter: true })
}

initializeModels()

module.exports = {
  Transaction, Budget, User
}