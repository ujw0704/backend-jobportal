

import jwt from "jsonwebtoken";

const userAuth = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ error: "Authentication failed" });
        }

        const token = authHeader.split(" ")[1];
        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            req.user = { userId: payload.userId };
            next();
        } catch (error) {
            return res.status(401).json({ error: "Authentication failed" });
        }
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

export default userAuth;
