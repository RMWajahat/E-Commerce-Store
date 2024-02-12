const { registerUser, loginUser, logoutUser } = require('../Controllers/userController');

const express = require('express');
const user_router = express.Router();

// Path: backend/Routes/userRoutes.js
user_router.route('/register').post(registerUser);
user_router.route('/login').post(loginUser);
user_router.route('/logout').get(logoutUser)





module.exports = user_router;