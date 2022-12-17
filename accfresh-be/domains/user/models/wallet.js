const { Decimal128 } = require("bson");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WalletSchema = new Schema({
    balance: Decimal128,
    previousBalance: Decimal128,
    user: {type: mongoose.Types.ObjectId, ref: "users"}
}, { timestamps: true });

const Wallet = mongoose.model('wallets', WalletSchema);

module.exports = Wallet;