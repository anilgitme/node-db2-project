const express = require("express")

const server = express()

const carRouter = require('./cars/cars-router')

// DO YOUR MAGIC

server.use(express.json())

server.use('/api/cars', carRouter)
module.exports = server;