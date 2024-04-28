import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // empty token && take token

    if (token == null) {
        return res.status(401).json({
            status: "fail",
            message: "Unauthorized: No token provided",
        });
    }

    jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({
                status: "fail",
                message: "Fobidden: Invalid token",
            });
        }

        req.email = decoded.email;
        next();
    });
};
