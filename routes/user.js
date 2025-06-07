const express = require('express');
const {handleUserSignup,handleUserLogin} = require('../controllers/user'); // Import the user controller
const router = express.Router();

router.post('/',handleUserSignup)

router.post('/login',handleUserLogin)

module.exports = router;