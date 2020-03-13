const Sequelize = require('sequelize')
const db = require('../db')

const User = db.define('user', {
  name: {
    type: Sequelize.STRING, // 255 or less
    allowNull: false // required
  },
  password: {
    type: Sequelize.STRING, // 255 or less
    allowNull: false // required
  },
})

module.exports = User