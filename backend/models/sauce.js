const mongoose = require('mongoose');
const { Schema } = mongoose;

const sauceSchema = new Schema({
    userId: String, // String is shorthand for {type: String}
    name: String,
    manufacturer: String,
    description: String,
    mainPepper: String,
    imageUrl: String,
    heat: Number,
    likes: Number,
    dislikes: Number,
    usersLiked: [String],
    usersDisliked: [String],
});

const Sauce = mongoose.model('Sauce', sauceSchema);
module.exports = Sauce;