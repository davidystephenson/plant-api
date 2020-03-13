// Import Sequelize so we can define field types
const Sequelize = require('sequelize')

// Import db instance to create table
const db = require('../db')

// Import Species model to establish relationship
// Do not create a circular dependency
// If Family imports Species, Species must not import Family
const Species = require('../species/model')

// Make model to create table
// Model is capitalized because it is a class
const Family = db.define(
  'family', // model name
  { // field object
    name: Sequelize.STRING, // 'tree'
    location: {
      type: Sequelize.STRING, 
      defaultValue: 'everywhere',
      allowNull: false // false === required, true === optional
    },
    age: Sequelize.INTEGER
  }
  // don't add a third argument that defines an options object for now
  // timestamps can be helpful and default table names should be fine
  // after your final assignment, do whatever you want
) 

// Establish relationships
// establish all relationships in one file
// if you distribute the relationships
// you will create circular dependencies

// child belongs to parent
// adds a familyId field to the species table
// this does not automatically assign the familyId
// of each species when you create it
// you must manually define the speciesId
// of each entity when you add it with Species.create
// like: Species.create({ name: 'flax', age: 1, familyId: 2 })
// Make sure to check the familyId manually you pass to create
// if the field is NULL in your table
Species.belongsTo(Family) // both are classses


// parent has many children
// enables inclusion when finding
// adds species array property when finding
// const family = Family.findByPk(1, { include: [Species] })
// family === {
//   id: 1,
//   name: 'tree',
//   location: 'everywhere',
//   species: [
//     {
//       id: 1,
//       name: 'oak',
//       age: 3500000,
//       familyid: 1
//     },
//     {
//       id: 2,
//       name: 'pine',
//       age: 75000000,
//       familyId: 1
//     }
//   ]
// }
// the species array property will only exist if you use the 'include' option
// and if each familyId is correctly defined
Family.hasMany(Species) // both are classes

// Export the model
module.exports = Family