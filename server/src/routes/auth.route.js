import express from 'express';
import { login, logOut, signUp, updateProfile } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
const route = express.Router();

route.post('/signup', signUp);
route.post('/login', login);
route.post('/logout', logOut);
route.put('/update-profile', authMiddleware, updateProfile);


export default route;