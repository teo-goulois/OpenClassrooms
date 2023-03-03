const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    email: String, // unique
    password: String, // hash password
});

const User = mongoose.model('User', userSchema);
module.exports = User;