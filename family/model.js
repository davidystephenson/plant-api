// Import Sequelize so we can define field types
const Sequelize = require('sequelize')

// Import db instance to create table
const db = require('../db')

// Make model to create table
// Model is capitalized because it is a class
const Family = db.define(
  'family', // model name
  { // field object
    name: Sequelize.STRING, // 'tree'
    location: Sequelize.STRING
  }
)

// Export the model
module.exports = Family