const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')


const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')

    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        request.token = authorization.replace('Bearer ','')
    }
    next()
  }

const userExtractor = async (request, response, next) => {
	const token = request.token
    if (!token) {
        return response.status(401).json({ error: 'token missing' })
    }

    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'invalid token' })
    }

    const user = await User.findById(decodedToken.id)
    if (!user) {
        return response.status(401).json({ error: 'user not found' })
    }

    request.user = user
    next()
};


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