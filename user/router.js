const express = require('express')
const User = require('./model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const secret = process.env.JWT_SECRET || 'e9rp^&^*&@9sejg)DSUA)jpfds8394jdsfn,m'

function makeJwt (payload) {
  return jwt.sign(payload, secret, { expiresIn: '1h' })
}

const { Router } = express

const router = Router()

router.post(
  '/login',
  async function (request, response, next) {
    const { name, password } = request.body
    try {
      const user = await User.findOne({ where: { name }})

      if (!user) {
        return response
          .status(400)
          .send('The username is not found')
      }

      const correct = bcrypt.compareSync(password, user.password)

      if (correct) {
        const jwt = makeJwt({ userId: user.id })
        console.log('jwt test:', jwt)

        return response.send(jwt)
      }

      return response
        .status(400)
        .send('The password is incorrect')
    } catch (error) {
      next(error)
    }
  }
)

router.post(
  '/user',
  async function (request, response, next) {
    try {
      const { name, password } = request.body

      console.log('password test:', password)

      const scrambled = bcrypt.hashSync(password, 10)

      const entity = { name, password: scrambled }

      const user = await User.create(entity)

      response.send(user)
    } catch (error) {
      next(error)
    }
  }
)

module.exports = router