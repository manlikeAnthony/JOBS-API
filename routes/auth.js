const express= require('express');
const router = express.Router();

const {login , register} = require('../controllers/auth');
const { METHOD_FAILURE } = require('http-status-codes');

router.post('/register' , register)
router.post('/login' , login)

module.exports = router