const express = require('express');
const { registerOrLoginUser, verifyToken } = require('../controllers/authController');

const router = express.Router();

router.post('/registerOrLogin', registerOrLoginUser);
router.post('/verifyToken', verifyToken);

module.exports = router;
