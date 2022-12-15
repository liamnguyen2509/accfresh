const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AccountSchema = new Schema({
    content: String,
    isSold: Boolean,
    isActive: Boolean,
    group: {type: mongoose.Types.ObjectId, ref: "Product"},
    order: {type: mongoose.Types.ObjectId, ref: "Order"},
    user: {type: mongoose.Types.ObjectId, ref: "User"}
}, { timestamps: true });

const Account = mongoose.model('accounts', AccountSchema);

module.exports = Account;