// import express to create the router
const express = require('express')

// import model to connect to database
const Species = require('./model')

// destructure router factory
const { Router } = express

// create a router instance
const router = Router()

// get all species
router.get(
  '/species', // path
  async (request, response, next) => { // handler callback
    try {
      // read all table rows using a promise
      const speciesList = await Species.findAll()

      // send the array as a reponse
      response.send(speciesList)
    } catch (error) {
      next(error)
    }
  }
)

// create a species
router.post(
  '/species', // path
  async (request, response, next) => { // handler callback
    try {
      // decide what part of the body you want based on the model fields
      const { name, age, familyId } = request.body

      // make entity object
      const entity = { name, age, familyId }

      // add a row to the database using a promise
      const species = await Species.create(entity)

      // send the object as a response
      response.send(species)
    } catch (error) {
      next(error)
    }
  }
)

// get one species by id
router.get(
  '/species/:name', // path with an id parameter
  async (request, response, next) => { // handler callback
    try {
      // pick what parameters we want
      const { name } = request.params

      // say where the record I want it is in the table
      const where = { name }

      // find one in that location using a promise
      const species = await Species.findOne({ where })
      // const species = await Species.findOne({ where: { name: name } })

      // send object as response
      response.send(species)
    } catch (error) {
      next(error)
    }
  }
)

// modify an existing record
router.put(
  '/species/:name', // path with name parameters
  async (request, response, next) => { // handler callback
    try {
      // decide what parameter you want
      const { name } = request.params

      // decide where the record you want to change is
      const where = { name }

      console.log('request.body test:', request.body)

      // update an existing database table using a promise
      const species = await Species.update(
        request.body,
        { where } // omit the options object to change all rows in the table
      )

      // send the number of changed rows as a response
      response.send(species)
    } catch (error) {
      next(error)
    }
  }
)

router.delete(
  '/species', // path
  async (request, response, next) => {
    try {
      
    } catch (error) {
      next(error)
    }
  }
)

module.exports = router