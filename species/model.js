// import sequelize as a class for field types
const Sequelize = require('sequelize')

// import db instance to connect to database
const db = require('../db')

// call db.define to create table and class
const Species = db.define(
  'species', // model name
  { // fields object
    name: Sequelize.STRING, // text
    age: Sequelize.INTEGER // number
  }
)

module.exports = Species