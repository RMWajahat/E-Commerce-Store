const jwt = require('jsonwebtoken');

const generateTokenFromid = (user_id) => {
    jwt.sign({ id: user_id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JW_TOKEN_EXPIRES_TIME
    })
}


module.exports = generateTokenFromid;