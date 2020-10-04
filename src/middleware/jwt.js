const jwt = require('jsonwebtoken');
const common = require('../config/jwtTokenConfig');

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, common.accessTokenSecret, (err, user) => {
            if (err) {
               // return res.sendStatus(403);
                return res.status(403).send({ auth: false, message: 'No token provided.' });
            }

            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};


module.exports={
	authenticateJWT
}