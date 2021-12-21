const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    var authHeader = req.headers.authorization;
    // console.log(authHeader);

    if (!authHeader) {
        return res.status(400).send('No token found');
    }

    var token = authHeader.split(" ")[1]; // to remove 'BEARER'

    try {
        const payload = jwt.verify(token, process.env.JWTSECRET);
        if (payload) {
            req.payload = payload;
            next();
        }
        else {
            return res.status(401).send('Invalid token');

        }

    } catch (e) {
        return res.status(401).send('Invalid token');
    }
}

const checkUser = (req, res, next) => {
    if (req.payload.isAdmin == false) {
        next();
    } else {
        return res.status(401).send('Not authorized');
    }
}

const checkAdmin = (req, res, next) => {
    if (req.payload.isAdmin == true) {
        next();
    } else {
        return res.status(401).send('Not authorized');
    }
}

module.exports = { checkAdmin, checkUser, verifyJWT };