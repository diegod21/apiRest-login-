const jwt = require('jsonwebtoken');
module.exports = function (req,res,next){
    const token = req.header('authorization-token')
    if(!token)
        return res.status(401).send('access denied')

try {
    const userVerified = jwt.verify(token, process.env.SECRET_JWT)
    req.user = userVerified
    next()
} catch (error) {
    res.status(401).send('access denied')
}

}