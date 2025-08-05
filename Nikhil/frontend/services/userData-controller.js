import bcrypt from "bcrypt";
import { User } from "../models/userData.js";

export const userRegister = async (req, res) => {
    try {
        const { username, password, position, access_level } = req.body;

        if (!username || !password || !position || !access_level) {
            return res.status(400).json({
                success: false,
                message: "Please Fill All the Required Data!"
            })
        }

        const rounds = parseInt(process.env.Rounds) || 10;
        const hashedPassword = await bcrypt.hash(password, rounds);

        const newUser = {
            username: String(username),
            password: hashedPassword,
            position: String(position),
            access_level: String(access_level),
        };


        const user = await User.findOne({ username });
        console.log( await user,"user")
        if (user) {
            return res.status(403).json({
                success: false,
                message: "User Already Exists",
            });
        }
        const result = await User.create(newUser);

        console.log("User Saved Successfully:",await result);

        res.status(200).json({
            success: true,
            message: "User Registered Successfully.",
            user: {
                username: result.username,
                position: result.position,
                access_level: result.access_level
            }
        });

    } catch (err) {
        console.error("Error in Registering User:", err);
        res.status(500).json({
            success: false,
            message: "Error Registering User.",
            error: err.message,
        });
    }
};

export const userLogin = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: "Please Fill All the Required Data!"
            })
        }

        const user = await User.findOne({ username });
        console.log(user, "user")
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found",
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid password",
            });
        }

        res.status(200).json({
            success: true,
            message: "Login successful",
            user: {
                username: user.username,
                position: user.position,
                access_level: user.access_level,
            },
        });

    } catch (err) {
        console.error("Error during login:", err);
        res.status(500).json({
            success: false,
            message: "Error logging in",
            error: err.message,
        });
    }
};

export const userGet = async (req, res) => {
    try {
        const { username } = req.body;

        if (!username) {
            return res.status(400).json({
                success: false,
                message: "Please Fill All the Required Data!"
            })
        }

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found",
            });
        }


        res.status(200).json({
            success: true,
            message: "Data Retrived  successful",
            user: {
                username: user.username,
                position: user.position,
                access_level: user.access_level,
            },
        });
    } catch (err) {
        console.error("Error Getting User:", err);
        res.status(500).json({
            success: false,
            message: "Error Getting User",
            error: err.message,
        });
    }
}