const registerUser = require('../Controllers/userController');

const express = require('express');
const user_router = express.Router();

// Path: backend/Routes/userRoutes.js
user_router.route('/register').post(registerUser);





module.exports = { user_router };