// DO YOUR MAGIC
const express = require('express');

const {
    checkCarId,
    checkCarPayload,
    checkVinNumberValid,
    checkVinNumberUnique
} = require('./cars-middleware');

const router = express.Router();
const Cars = require('./cars-model');