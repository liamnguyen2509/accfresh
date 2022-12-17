const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: String,
    email: String,
    password: String,
    authToken: String,
    wallet: {type: mongoose.Types.ObjectId, ref: "wallets"},
    orders: [{ type: mongoose.Types.ObjectId, ref: "orders" }],
    payments: [{ type: mongoose.Types.ObjectId, ref: "payments" }]
}, { timestamps: true });

const User = mongoose.model('users', UserSchema);

module.exports = User;