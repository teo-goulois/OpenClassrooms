const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    email: { type: String, unique: true, required: true }, // unique
    password: String, // hash password
});

const User = mongoose.model('User', userSchema);
module.exports = User;