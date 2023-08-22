const express = require('express');
const User = require('../models/User');
const Stage = require('../models/stage');
const UserRouter = express.Router();
// =============================================================================
// //REGISTER User API
// =============================================================================
UserRouter.post('/register', async (req, res) => {
    const User = new User(req.body);
    const existing_User = await User.findOne({ username: User.username });
    if (existing_User) {
        return res.status(409).json({ error: 'User already exists' });
    }
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
// // Get all stages of a specific User
// =============================================================================
UserRouter.get('/:UserId/stages', async (req, res) => {
    try {
        const UserId = req.params.UserId; // Get the User ID from the URL parameter
        const stages = await Stage.find({ UserId: UserId }); // Find all stages with the specified User ID
        res.json(stages);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});
// =============================================================================
// // DELETE ALL UserS
// =============================================================================
UserRouter.delete('/', async (req, res) => {
    try {
        const group = await User.deleteMany();

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json(error.message);
    }
});

module.exports = UserRouter;