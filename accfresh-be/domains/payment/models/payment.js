const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
    paymentId: String,
    paymentTime: String,
    paymentUnit: String,
    paymentAmount: String,
    type: String,
    payeeAccount: String,
    payeeName: String,
    suggestedMemo: String,
    status: String,
    isDeposit: Boolean,
    user: {type: mongoose.Types.ObjectId, ref: "users"}
}, { timestamps: true });

const Payment = mongoose.model('payments', PaymentSchema);

module.exports = Payment;