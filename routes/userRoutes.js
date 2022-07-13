const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

//Create User Route

router.post('/create', userController.createUser);

module.exports = router;