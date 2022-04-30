const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../utils/db')

class Budget extends Model {}

Budget.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  category: {
    type: DataTypes.TEXT,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true,
      isAlpha: true
    }
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      notEmpty: true,
      isFloat: true
    }
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'budget'
})

module.exports = Budget