import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (token) {
      // If token exists, verify it and set req.user
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (!decoded) return res.status(401).json({ message: "Access denied" });

      const user = await User.findById(decoded.userId).select("-password");

      if (!user) return res.status(401).json({ message: "User not found" });

      req.user = user; // Set req.user if token is valid
    }

    // Always call next() to allow the request to proceed
    next();
  } catch (error) {
    console.error('Error in authMiddleware:', error.message); // Log any errors
    res.status(401).json({ error: "Invalid token" });
  }
};