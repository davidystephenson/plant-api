// Import express to make the router
const express = require('express')

// import the model to connect to the database
const Family = require('./model')

// import the related model to include it
const Species = require('../species/model')

// destructure the router factory
const { Router } = express

// make router instance
const router = Router()

// attach endpoints

// get all families
router.get(
  '/family', // path
  async (request, response, next) => { // handler callback
    try {
      // get all families from database using a promise
      const families = await Family.findAll(
        { // options object
          include: [ // include always takes an array
            Species // Family has many Species
          ]
        }
      ) 

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

// get one family
router.get(
  '/family/:id', // path with an id parameter
  async (request, response, next) => {// handler callback
    try {
      // pick what parameters you want
      const { id } = request.params

      // read single family by id using a promise
      const family = await Family.findByPk(
        id, // the id of the target record
        { // options object
          include: [ // include takes an array
            Species
          ]
        }
      )

      // read single entity using where
      // const family = await Family.findOne({ where: { id } })

      // send object as response
      response.send(family)
    } catch (error) {
      next(error)
    }
  }
)

router.put(
  '/family/:id', // path with an id parameter
  async (request, response, next) => { // handler callback
    try {
      // deicde what parameters you want
      const { id } = request.params

      // find the record you want to change with a promise
      const family = await Family.findByPk(id)

      console.log('request.body test:', request.body)
      console.log('family test:', family.dataValues)

      // update that one record with a promise
      const updated = await family.update(request.body)

      // send object as response
      response.send(updated)
    } catch (error) {
      next(error)
    }
  }
)

module.exports = router