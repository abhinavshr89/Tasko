import User from "../models/user.model.js";
import { sendToken } from "../utils/jwt.auth.js";

export const registerController = async(req, res) => {
    try{
        const {name, email, password} = req.body;
        if(!name || !email || !password){
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }
        // check if user already exists
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }
        // create new user
        const user = await User.create({name, email, password});
        // Use sendToken utility
        sendToken(user, res, "User created successfully", 201);

    }catch(err){
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }
        // Use sendToken utility
        sendToken(user, res, "Login successful", 200);
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

export const logoutController = (req, res) => {
    // Clear the token cookie
    res.clearCookie("token");
    return res.status(200).json({
        success: true,
        message: "Logout successful"
    });
};

export const meController = (req, res) => {
    if (!req.user) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    res.status(200).json({
        success: true,
        user: req.user
    });
};

