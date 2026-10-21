const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if(!authHeader || authHeader.startsWith("bearear ")) {
            return res.status(401).json({
                message: "JWT required"
            });
        }

        const token = authHeader.split(" ")[1];

        const decode = jwt.verify(token, process.env.JWT_SECRET);

        req.userId = decode.userID;

        next();
    } catch(error) {
        return res.status(401).json({
            message: "Invalid JWT"
        });
    }
};

module.exports = auth;