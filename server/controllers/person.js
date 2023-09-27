const PersonModel = require('../model/user.js');
const { validationResult } = require('express-validator');


exports.getPerson = async (req, res) => {

    try {
        const persons = await PersonModel.find();

        res.status(200).json(persons);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

exports.createPerson = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(500).json(errors)
    }
    const { firstname, lastname, email, age, dob, country, state, city, gender } = req.body;
    const newPerson = new PersonModel({ firstname, lastname, email, age, dob, country, state, city, gender });
    try {

        await newPerson.save();
        return res.status(201).json(newPerson);

    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}