const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: String,
    email: String,
    password: String,
    authToken: String
}, { timestamps: true });

const User = mongoose.model('Users', UserSchema);

module.exports = User;