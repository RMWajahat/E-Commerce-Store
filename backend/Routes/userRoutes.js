const { registerUser, loginUser, logoutUser, forgetPassword, resetPassword, getUserDetails, updatePassword } = require('../Controllers/userController');

const express = require('express');
const { AuthenticateUser } = require('../middleware/Authenticate');
const user_router = express.Router();

// Path: backend/Routes/userRoutes.js
user_router.route('/register').post(registerUser);
user_router.route('/login').post(loginUser);
user_router.route('/logout').get(logoutUser)
user_router.route('/forgetpassword').post(forgetPassword)
user_router.route('/resetpassword/:token').put(resetPassword)
user_router.route('/me').get(AuthenticateUser, getUserDetails);
user_router.route('/me/password/update').put(AuthenticateUser, updatePassword);





module.exports = user_router;