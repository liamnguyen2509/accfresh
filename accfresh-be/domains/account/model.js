const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AccountSchema = new Schema({
    content: String,
    isSold: Boolean,
    isActive: Boolean,
    product: {type: mongoose.Types.ObjectId, ref: "products"},
    orderDetail: {type: mongoose.Types.ObjectId, ref: "orderDetails"}
}, { timestamps: true });

const Account = mongoose.model('accounts', AccountSchema);

module.exports = Account;