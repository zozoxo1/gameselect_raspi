const jwt = require('jsonwebtoken')

const jwt_secret_token = process.env.JWT_SECRET_TOKEN

module.exports.verifyAdminPermission = (req, res, next) => {
    
    const role = req.auth_data.user.role
    if(!role) {
        res.status(403).json({
            message: "Role is not defined"
        })
        return
    }

    if(role !== 'admin') {
        res.status(403).json({
            message: "Role has to be 'admin'"  
        })
        return
    }

    next()
}

module.exports.verifyToken = (req, res, next) => {
    // get auth header value
    const bearerHeader = req.headers['authorization']

    if(typeof bearerHeader === 'undefined') {
        // forbidden
        res.status(403).json({
            message: "Bearer token required"  
        })
        return
    }

    // Authorization: Bearer <access_token>
    const bearer = bearerHeader.split(" ")
    const bearerToken = bearer[1]

    req.token = bearerToken

    jwt.verify(req.token, jwt_secret_token, (err, auth_data) => {
        if(err) {
            res.status(403).json({
                message: "Could not verify token: " + err
            })
        } else {
            req.auth_data = auth_data
            next()
        }
    })

}
