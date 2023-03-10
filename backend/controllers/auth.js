const User = require('../models/user');

const bcrypt = require("bcryptjs"); // import bcrypt to hash passwords
const jwt = require("jsonwebtoken"); // import jwt to sign tokens

require('dotenv').config();
const { SECRET = "secret" } = process.env;

exports.signup = async (req, res, next) => {
    try {
        // check if user already exists in database
        const userAlreadyExist = await User.findOne({ email: req.body.email });
        if (userAlreadyExist) return res.status(400).send({ error: new Error('User already exists!') });
        // hash password
        req.body.password = await bcrypt.hash(req.body.password, 10);
        // create user in database
        const user = await User.create(req.body);

        res.status(201).json({
            message: 'User created!'
        });

    } catch (error) {
        res.status(400).json({ message: error });
    }
};

exports.login = async (req, res, next) => {
    try {
        // get user from database
        const user = await User.findOne({ email: req.body.email });
        // check if user exists
        if (user) {
            // check if password is correct
            const passwordIsValid = await bcrypt.compare(req.body.password, user.password);
            if (passwordIsValid) {
                // create token
                const token = jwt.sign({ id: user._id }, SECRET, {
                    expiresIn: 86400 // expires in 24 hours
                });
                // return id and token containing user id
                console.log({
                    userId: user._id,
                    token: token
                });
                res.status(200).json({
                    userId: user._id,
                    token: token
                });
            } else {
                res.status(401).json({
                    message: 'Paire login/mot de passe incorrecte'
                });
            }
        } else {
            res.status(404).json({
                message: 'Paire login/mot de passe incorrecte'
            });
        }
    } catch (error) {
        res.status(400).json({ message: error });
    }
};