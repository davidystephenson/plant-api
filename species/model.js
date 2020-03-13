// import sequelize as a class for field types
const Sequelize = require('sequelize')

// import db instance to connect to database
const db = require('../db')

// call db.define to create table and class
const Species = db.define(
  'species', // model name
  { // fields object
    name: Sequelize.STRING, // text
    // STRING means 255 characters or less
    // STRING(x) means x characters or less
    // TEXT means any length
    age: Sequelize.INTEGER // number
    // INTEGER means whole numbers (-1, 0, 1, 255)
    // FLOAT means decimals (0.1, 0.9999, 255.0, 255.9999)
    
    // more info here: https://codewithhugo.com/sequelize-data-types-a-practical-guide/
  }
)

module.exports = Species