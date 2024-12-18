const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body
  
  if (!password) {
    return response.status(400).json({ error: 'Password is required' })
  }

  const user = await User.findOne({ username })

  if (!user) {
    return response.status(401).json({ error: 'Invalid username or password' })
  }

  if (!user.passwordHash) {
    return response.status(500).json({ error: 'Internal server error' })
  }

  const passwordCorrect = await bcrypt.compare(password, user.passwordHash)

  if (!passwordCorrect) {
    return response.status(401).json({ error: 'Invalid username or password' })
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  const token = jwt.sign(userForToken, process.env.SECRET)

  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter