import { signJWT} from "../utils/jwt.js";
import User from "../model/user.js";
import {hashPassword, comparePassword} from "../utils/bcrypt.js";



// Creating a new user and saving it to the database
export const createUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        if(!username || !password){
            return res.status(400).json({ error: "Username and password are required" });
        }
        const encryptedPassword = await hashPassword(password);
        const newUser = new User({ username, password: encryptedPassword });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
};


// Login user and generate JWT
export const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        if(!username || !password){
            return res.status(400).json({ error: "Username and password are required" });
        }
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({error: "Invalid credentials"});
        }
        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({error: "Invalid credentials"});
        }
        const token = signJWT({ username: user.username, userId: user._id });
        res.status(200).json({ token });
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }};
