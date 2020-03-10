// Import Sequelize so we can define field types
const Sequelize = require('sequelize')

// Import db instance to create table
const db = require('../db')

// Import Species model to establish relationship
const Species = require('../species/model')

// Make model to create table
// Model is capitalized because it is a class
const Family = db.define(
  'family', // model name
  { // field object
    name: Sequelize.STRING, // 'tree'
    location: Sequelize.STRING
  }
)

// Establish relationships

// child belongs to parent
// adds a familyId field to the species table
Species.belongsTo(Family) // both are classses


// parent has many children
// enables inclusion when finding
// adds species array property when finding
Family.hasMany(Species) // both are classes

// Export the model
module.exports = Family