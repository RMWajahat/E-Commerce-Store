const { generateTokenFromid } = require('./generateToken');

const sendTokenResponse = (User_current, statusCode, message, res) => {
    const options = {
        withCredentials: true,
        httpOnly: false
    }
    const token_for_user = generateTokenFromid(User_current._id);
    res.cookie('token', token_for_user, options);
    console.log("Token is set in cookie");
    res.status(statusCode).json({
        success: true,
        message: message
    })
}

module.exports = sendTokenResponse;