import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) return res.status(401).json({ error: "Access denied. No token provided." });

        const decoded = jwt.verify(token, process.env.JWT_SECRET); // ✅ Use verify, not decode
        if (!decoded) return res.status(401).json({ message: "Access denied" });

        const user = await User.findById(decoded.userId).select("-password");
        if (!user) return res.status(401).json({ message: "User not found" });

        req.user = user;
        next(); // ✅ Allow request to continue
    } catch (error) {
        res.status(401).json({ error: "Invalid token" });
    }
};
