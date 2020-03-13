const Sequelize = require('sequelize')

// david@davidystephenson.com
// david:password@davidystephenson.com

// protocol://username:password@domain:port/path

// protocol is always 'postgres'

// username is always 'postgres'

// password is set in your 'docker run command':
// docker run -p 5432:5432 --name tree-api -e POSTGRES_PASSWORD=<password> -d postgres

// domain is 'localhost' for a docker database

// port is set in your docker command
// docker run -p <5432>:5432 --name tree-api -e POSTGRES_PASSWORD=<password> -d postgres

// path is always 'postgres'
const databaseUrl = process.env.DATABASE_URL ||
  'postgres://postgres:password@localhost:5432/postgres'
// without Heroku, you woudl just need
// const databaseUrl = 'postgres://postgres:password@localhost:5432/postgres'

const db = new Sequelize(databaseUrl);

db
  .sync({ force: true }) // true will delete everything. false is the default.
  .then(() => console.log('Database connect')) // confirm database is working

// db.js only needs to be imported in model files
// only import db in index.js or anywhere else for testing
module.exports = db