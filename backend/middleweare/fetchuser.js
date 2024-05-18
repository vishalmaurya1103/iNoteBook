const jwt = require('jsonwebtoken');
const JWT_TOKEN = 'vishal$123'

const fetchuser = (req,res,next) =>{
    const token = req.header('auth-token')
    if(!token){
        res.status(401).send({error : "Please authenticate using a valid token"})
    }
    try {
        const string =jwt.verify(token,JWT_TOKEN)
        req.user = string.user
        next();    
    } catch (error) {
        res.status(401).send({error : "Please authenticate using a valid token"})
    }
}

module.exports = fetchuser