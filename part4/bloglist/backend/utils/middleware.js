const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const requestLogger = (request, response, next) => {
    logger.info('Method: ', request.method)
    logger.info('Path: ', request.path)
    logger.info('Body: ', request.body)
    logger.info('---')
    next()
}

const unknownEndpoint = (request, response) => {
    response.status(400).send({error: "unknownEndpoint"})
}

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')){
      request.token = authorization.replace('Bearer ', '')
    }

    next()	
}

const userExtractor = async (request, response, next) => {
	const authorization = request.get('authorization')
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return response.status(401).json({ error: 'token missing' })
  }

  const token = authorization.replace('Bearer ', '')

	const decodedToken = jwt.verify(token, process.env.SECRET)
	if (!decodedToken){
		return response.status(401).json({ error: 'user not found' })
	}

  const user  = await User.findById(decodedToken.id)
	request.user = user

	next()
}

const errorHandler = (error, request, response, next) => {
    console.log(error.message)
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message })
    } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
      return response.status(400).json({ error: 'expected `username` to be unique' })
    } else if (error.name ===  'JsonWebTokenError'){
      return response.status(401).json({ error: 'token invalid' })
    } else if (error.name === 'TokenExpiredError'){
      return response.status(401).json({ error: 'token expired'})
    } else if (error.name === 'Unauthorized'){
      return response.status(401).json({ error: 'token is not provided'})
    }
  
    next(error)
  }

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    tokenExtractor,
    userExtractor
}