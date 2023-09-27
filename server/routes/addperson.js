const express = require('express');
const { createPerson, getPerson } = require('../controllers/person.js');
const { check } = require('express-validator');

const validationArray = [
    check('email', 'Email is Not Valid')
        .isEmail(),
    check('firstname', 'First Name should contain only alphabets')
        .matches(/^[A-Za-z]+$/),
    check('lastname', 'Last Name should contain only alphabets')
        .matches(/^[A-Za-z]+$/)
]

const personRouter = express.Router();



personRouter.get('/getPerson', getPerson);
personRouter.post('/add',validationArray, createPerson);

module.exports = personRouter;