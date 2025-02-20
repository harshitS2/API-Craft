import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export default authMiddleware = async(req, res)=>{
    const token = req.cookies.jwt;
    if(!token) return res.status(401).json({error: "Access denied. No token provided."});
    const decode = jwt.decode(token, process.env.JWT_SECRET);
    if(!decode) return res.status(401).json({message: "Access denied", error: "Access denied"});
    const user = await User.findById(decode.UserId).select("-password");
    if(!user) return res.status(401).json({message: "User not found", error: "User not found"});
    req.user = user;
}