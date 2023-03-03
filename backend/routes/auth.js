const express = require('express');
const router = express.Router();
require('dotenv').config();
const User = require('../models/user');
const bcrypt = require("bcryptjs"); // import bcrypt to hash passwords
const jwt = require("jsonwebtoken"); // import jwt to sign tokens


const { SECRET = "secret" } = process.env;

// signup
router.post('/signup', async (req, res, next) => {
    try {
        // check if user already exists in database
        const userAlreadyExist = await User.findOne({ email: req.body.email });
        console.log("🚀 ~ file: auth.js:16 ~ router.post ~ userAlreadyExist:", userAlreadyExist)
        if (userAlreadyExist) return res.status(400).json({ message: 'Cet email est déja utilsé' });
        // hash password
        req.body.password = await bcrypt.hash(req.body.password, 10);
        // create user in database
        const user = await User.create(req.body);

        res.status(201).json({
            message: 'User created!'
        });

    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error });

    }
});

// login    
router.post('/login', async (req, res, next) => {
    try {
        // get user from database
        const user = await User.findOne({ email: req.body.email });
        console.log("🚀 ~ file: auth.js:37 ~ router.post ~ user:", user)
        // check if user exists
        if (user) {
            // check if password is correct
            const passwordIsValid = await bcrypt.compare(req.body.password, user.password);
            console.log("🚀 ~ file: auth.js:42 ~ router.post ~ passwordIsValid:", passwordIsValid)
            if (passwordIsValid) {
                // create token
                const token = jwt.sign({ id: user._id }, SECRET, {
                    expiresIn: 86400 // expires in 24 hours
                });
                console.log("🚀 ~ file: auth.js:48 ~ router.post ~ token:", token)
                // return id and token containing user id
                res.status(200).json({
                    userId: user._id,
                    token: token
                });
            } else {
                res.status(401).json({
                    message: 'Password is incorrect!'
                });
            }
        } else {
            res.status(404).json({
                message: 'User not found!'
            });
        }
    } catch (error) {
        res.status(400).json({ message: error });
    }
});

module.exports = router;