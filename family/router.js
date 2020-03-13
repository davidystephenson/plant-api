// Import express to make the router
const { Router } = require('express')

// const router = require('express').Router

// const express = require('express')
// const router = express.Router

// const express = require('express')
// const { Router }  = express


// import the model to connect to the database
// models are only imported in routers
const Family = require('./model')

// import the related model to include it
const Species = require('../species/model')

// make router instance
const router = Router()

// Endpoints

// CRUD terms   HTTP types    Express methods   Sequelize methods
// Create       POST          app.post          Model.create(entity)
// Read         GET           app.get           Model.findAll(query)
// Update       PUT           app.put           Model.update(update, query)
// Delete       DELETE        app.delete        Model.destroy(query)

// 'entity' is an object that describes a new table row
// { name: 'tree', location: 'everywhere' }

// 'query' is an object that describes what data you want
// and what you want to include
// {
//   where: { id: 1 },
//   include: [Model]
// }

// 'update' is an object that describes how the data should change
// { name: 'very beautiful oak tree' }
// here is a good example: https://medium.com/@sarahdherr/sequelizes-update-method-example-included-39dfed6821d

// read all families
router.get(
  '/family', // path
  async (request, response, next) => { // handler callback
    // read all families from database using a promise
    try {
      // query is where we say what relations should be included
      const query = {
        include: [ // include always takes an array
          Species // Family has many Species
        ]
      } 

      const families = await Family.findAll(query)

      // send the array as a response
      response.send(families) 
    } catch (error) {
      next(error) // built-in error handling from express
    }
  }
)

// create a new family 
router.post(
  '/family', // path
  async (request, response, next) => { // handler callback
    try {
      // decide what parts of the body we want
      // based on the model fields
      const { name, location } = request.body

      // create an entity object
      // that describes what I want to make
      // this defines the values of the fields in your table
      // the column names are defined in the model file 
      const entity = { name, location }

      // add a row to the database using a promise
      const family = await Family.create(entity)

      // send the object as a response
      response.send(family)
    } catch (error) {
      next(error)      
    }
  }
)

// read one family
router.get(
  '/family/:id', // path with an id parameter
  async (request, response, next) => {// handler callback
    try {
      // pick what parameters you want
      const { id } = request.params

      // define included relations in the query
      const query = {
        include: [ // include takes an array
          Species // Family.hasMany(Species)
        ]
      }

      // read single family by id using a promise
      const family = await Family.findByPk(
        id, // the id of the target record
        query // unlike findAll, findByPk takes two arguments. 
      )

      // read single entity using where
      // const family = await Family.findOne({
      //   where: { id },
      //   include: [Species]
      // })
      // Notice a query is still passed.

      // send object as response
      response.send(family)
    } catch (error) {
      next(error)
    }
  }
)

// update a single family
router.put(
  '/family/:id', // path with an id parameter
  async (request, response, next) => { // handler callback
    try {
      // deicde what parameters you want
      const { id } = request.params

      // find the record you want to change with a promise
      // we don't include relations because we don't send
      // this data to the user
      const family = await Family.findByPk(id)

      console.log('request.body test:', request.body)
      console.log('family test:', family.dataValues)

      // update that one record with a promise
      // benefit: we get the final updated object
      // cost: we must wait for a long promise to finish twice
      const updated = await family.update(request.body)

      // send object as response
      response.send(updated)
    } catch (error) {
      next(error)
    }
  }
)

module.exports = router