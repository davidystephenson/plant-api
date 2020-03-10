const Sequelize = require('sequelize')

// david@davidystephenson.com
// david:password@davidystephenson.com

// protocol://username:password@domain:port/path
const databaseUrl = 'postgres://postgres:password@localhost:5432/postgres'

const db = new Sequelize(databaseUrl)

db
  .sync({ force: false }) // true will delete everything. false is the default.
  .then(() => console.log('Database connect')) // Confirm database is working

module.exports = db