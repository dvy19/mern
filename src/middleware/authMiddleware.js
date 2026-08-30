/*
authMiddleware is the security layer between the route and the controller

generate a JWT when the user logs in. Now we use that JWT to check:

"Is this request coming from a logged-in user?"

*/

const jwt = require("jsonwebtoken");


// frontend sends => Authorization: Bearer eyJhbGciOiJI...
const authMiddleware = (req, res, next) => {
    try {

        // this gets token
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "No token provided"
            });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        console.log(decoded)

        req.user = decoded;

        next();

    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
};

module.exports = authMiddleware;