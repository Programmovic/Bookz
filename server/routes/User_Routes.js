const express = require('express');
const User = require('../models/User');
const getNextId = require('../utils/getNextId');
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
    const User = new User(req.body);
    const existing_User = await User.findOne({ username: User.username });
    if (existing_User) {
        return res.status(409).json({ error: 'User already exists' });
    }
    User.id = await getNextId(); // Get the next ID for the stage
    User.save()
        .then((savedUser) => res.json(savedUser))
        .catch((err) => {
            res.status(500).json({ error: err });
        });
});
// =============================================================================
// //LOGIN User API
// =============================================================================
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
UserRouter.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const User = await User.findOne({ username });

        if (!User) {
            return res.status(401).json({ error: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, User.password);

        if (!isMatch) {
            return res.status(401).json({ error: 'Incorrect password' });
        }
        const token = jwt.sign({ UserId: User.id }, 'secret_key');

        res.json({ User, token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err });
    }
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