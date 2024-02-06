const jwt = require('jsonwebtoken');
const generateTokenFromid = (id) => {
    jwt.sign(id, process.env.JWT_SECRET, {
        expiresIn: '3d'
    })
}


export default generateTokenFromid;