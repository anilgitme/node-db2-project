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

router.get('/', async(req, res, next) => {
    try {
        const cars = await Cars.getAll();
        res.status(200).json(cars)
    } catch (err) {
        next(err)
    }
})

router.get('/:id', checkCarId, (req, res) => {
    res.status(200).json(req.car)
})

router.post('/', checkCarPayload, checkVinNumberUnique, checkVinNumberValid,
    async(req, res, next) => {
        try {
            const postCar = await Cars.create(req.body);
            res.json(postCar);
        } catch (err) {
            next(err)
        }
    })

router.use((err, req, res, next) => { // eslint-disable-line
    // CALL next(err) IF THE PROMISE REJECTS INSIDE YOUR ENDPOINTS
    res.status(500).json({
        message: 'something went wrong inside the accounts router',
        errMessage: err.message,
    })
})


module.exports = router;