const Cars = require('./cars-model');
const validateVin = require('vin-validator')

const checkCarId = async(req, res, next) => {
    // DO YOUR MAGIC
    try {
        const id = req.params.id;
        const getCar = await Cars.getById(id);
        if (!getCar) {
            res.status(404).json({ message: `car with id ${id} is not found` })
        } else {
            req.car = getCar;
            next();
        }
    } catch (err) {
        next(err);
    }
}

const checkCarPayload = (req, res, next) => {
    // DO YOUR MAGIC
    const { vin, make, model, mileage } = req.body;

    if (!vin) {
        res.status(400).json({ message: 'Vin is missing' })
    } else if (!make) {
        res.status(400).json({ message: 'Make is missing' })
    } else if (!model) {
        res.status(400).json({ message: 'model is missing' })
    } else if (!mileage) {
        res.status(400).json({ message: 'Mileage is missing' })
    } else {
        next()
    }
}

const checkVinNumberValid = (req, res, next) => {
    // DO YOUR MAGIC
    const vin = req.body.vin;
    if (!validateVin.validate(vin)) {
        res.status(400).json({ message: `vin ${vin} is invalid` })
    } else {
        next();
    }
}

const checkVinNumberUnique = async(req, res, next) => {
    // DO YOUR MAGIC
    try {
        const vin = await Cars.getAll(req.body.vin);
        if (vin) {
            res.status(400).json({ message: `vin number ${req.body.vin} already exists` })
        } else {
            next()
        }
    } catch (err) {
        next(err);
    }
}