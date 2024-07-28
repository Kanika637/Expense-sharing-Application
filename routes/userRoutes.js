const express = require('express');
const { createUser, getUserDetailsByName } = require('../controllers/userController');
const { validateUser } = require('../middleware/validationMiddleware');


const router = express.Router();

// Create User
router.post('/',validateUser, createUser);

// Retrieve User Details
router.get('/name/:name',getUserDetailsByName);

module.exports = router;
