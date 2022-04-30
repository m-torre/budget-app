const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../utils/db')

class Transaction extends Model {}

Transaction.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
      is: /^([a-zA-Z0-9\s])*$/,
      len: [2,]
    }
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      notEmpty: true,
      isFloat: true
    }
  },
  date: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
      isDate: true
    }
  },
  type: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
      isAlpha: true
    }
  },
  category: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
      is: /^([a-zA-Z&\s])*$/
    }
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'transaction'
})

module.exports = Transaction