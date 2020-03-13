// import external dependencies
const cors = require('cors')
const express = require('express')
// both packages export a function

// import local dependencies
const familyRouter = require('./family/router')
const speciesRouter = require('./species/router')
const userRouter = require('./user/router')

// make server
const app = express()

// make cors middleware first
// because you must unlock the request
// to see any data inside
// including the body
const corsMiddleware = cors()
app.use(corsMiddleware)
// app.use(cors())

// make body parser middleware
// body parser lets you look at request bodies
// body parse must be second because
// the body must be parsed to see the data
const parser = express.json()
app.use(parser)
// app.use(express.json())

app.get(
  '/test',
  (request, response) => { // function (req, res) {
    console.log('request.body test:', request.body)
    // without the parser, request.body always equals undefined
    // this is only possible because of the json parser
    const { name } = request.body 

    response.send(name) 
  }
)

// register routers
// each resource type should have its own router
// its hard to know where endpoints should go sometimes
// when in doubt, go by what type of data is send as the response
app.use(familyRouter)
app.use(speciesRouter)
app.use(userRouter)

// what port does the server listen on
// without Heroku, you just need port = 4000
port = process.env.PORT || 4000

// confirmation callback
function confirm () {
  console.log(`Listening on :${port}`)
}

// Start the server
app.listen(port, confirm)

// Schema

// Family - { name, location} - { name: 'tree', location: 'everywhere' }
//    Species - { name, age } - { name: 'oak', age: 35000000 }


// RELATIONS

// Species belongs to family
// so it wil have a familyId field automatically created by belongsTo
// There are many species in each family
// A family is made of species
// Each family has many species
// so you can include an array of all related species using hasMany

// family - { id, name, location, species: [{ id, name, age, familyId}] }
// species - { id, name, age, familyId }
