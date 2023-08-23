const express = require('express');
const User = require('../models/User');
const UserRouter = express.Router();
// =============================================================================
// //GET ALL Users API
// =============================================================================
UserRouter.get('/', async (req, res) => {

    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});
// =============================================================================
// //REGISTER User API
// =============================================================================
UserRouter.post('/register', async (req, res) => {
    const user = new User(req.body);
    const existingUser = await User.findOne({ username: user.username });
    if (existingUser) {
        return res.status(409).json({ error: 'User already exists' });
    }

    try {
        const savedUser = await user.save();
        res.json(savedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// =============================================================================
// //LOGIN User API
// =============================================================================
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
UserRouter.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ error: 'Incorrect password' });
        }
        const token = jwt.sign({ UserId: user._id }, 'secret_key');

        res.json({ user, token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err });
    }
});
// =============================================================================
// // Get USER DATA
// =============================================================================
UserRouter.get("/profile", (req, res) => {
    const token = req.headers["x-access-token"];

    if (!token) {
        return res.status(401).json({ error: "No token provided" });
    }

    jwt.verify(token, "secret_key", async (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: "Failed to authenticate token" });
        }

        const userId = decoded.id;
        try {
            const user = await User.findOne({ _id: userId });
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }
            res.status(200).json({ user });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    });
});
// =============================================================================
// // DELETE ALL UserS
// =============================================================================
UserRouter.delete('/', async (req, res) => {
    try {
        const users = await User.deleteMany();

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json(error.message);
    }
});

module.exports = UserRouter;