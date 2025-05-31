const express = require('express');
const {handleUserSignup} = require('../controllers/user'); // Import the user controller
const router = express.Router();

router.post('/',handleUserSignup)

module.exports = router;