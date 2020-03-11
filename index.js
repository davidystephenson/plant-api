// import express
const express = require('express')

// import cors
const cors = require('cors')

// make server
const app = express()

// import family router
const familyRouter = require('./family/router')

// import species router
const speciesRouter = require('./species/router')

// make cors middleware first
const corsMiddleware = cors()
app.use(corsMiddleware)

// make body parser middleware
// body parser lets you look at request bodies
const parser = express.json()
app.use(parser)

app.get(
  '/test',
  (request, response) => {
    console.log('request.body test:', request.body)
    // without the parser, request.body always equals undefined
    const { name } = request.body 


    response.send(name) // this is only possible
  }
)

// register routers
app.use(familyRouter)
app.use(speciesRouter)

// what port does the server listen on
port = 4000

// confirmation callback
function confirm () {
  console.log(`Listening on :${port}`)
}

// Start the server
app.listen( port, confirm)

// PLAN

// Family - Tree
//    Species - Oak
//    Species - Pine
//    Species - Birch
// Family - Grass
//    Species - Wheat
//    Species - Flax

// RELATIONS

// Species belongs to family
// There are many species in each family
// A family is made of species
// Each family has many species