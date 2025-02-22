import { generateToken } from "../lib/util.js";
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"


export const signUp = async (req, res) => {

    try {
        const { name, email, password, confirmPassword } = req.body;
        if (!name, !email, !password, !confirmPassword)
            return res.status(400).json({ message: "All fields are required" });
        if (password !== confirmPassword)
            return res.status(400).json({ message: "Passwords do not match" });
        const user = await User.findOne({ email });

        if (user) return res.status(400).json({ message: "Email already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
        res.status(500).json({ error: "Error registering user", error: error.message });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email, !password)
            return res.status(400).json({ error: "All fields are required" });
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: "User not found" });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });
        generateToken(user._id, res);
        res.status(200).json({ message: "User logged in successfully", user: user });
    }
    catch (error) {
        res.status(500).json({ error: "Error logging in user" });
    }
}


export const logOut = async (req, res) => {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).send("Logged Out!");
}
export const updateProfile = async (req, res) => {
    const user = req.user;
    try {
        if (!user) return res.status(401).json({ message: 'Not authorized' });
        const { name, email } = req.body;
        const updatedUser = await User.findOneAndUpdate(user._id, {
            name,
            email,
        }, { new: true, select: "-password" });
        if (!updatedUser) return res.status(404).json({ message: 'User not found' });
        res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
        console.error("Internal error: " + error.message);
        res.status(401).json("Internal error: " + error.message);
    }
}

export const checkAuth = async (req, res) => {
    res.status(200).json({ message: "Authenticated", user: req.user });
};
