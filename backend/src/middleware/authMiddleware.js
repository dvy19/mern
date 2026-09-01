const authMiddleware = (req, res, next) => {
    try {
        // Get token from HTTP-only cookie
        const token = req.cookies.accessToken;

        if (!token) {
            return res.status(401).json({
                message: "No token provided"
            });
        }

        // Verify token
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        console.log(decoded);

        // Attach decoded user information to request
        req.user = decoded;

        next();

    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
};

module.exports = authMiddleware;