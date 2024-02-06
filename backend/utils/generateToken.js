const jwt = require('jsonwebtoken');

const generateTokenFromid = (id) => {
    jwt.sign(id, process.env.JWT_SECRET, {
        expiresIn: '3d'
    })
}


module.exports = { generateTokenFromid };