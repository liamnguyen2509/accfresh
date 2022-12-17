const { Decimal128 } = require("bson");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    totalAmount: Decimal128,
    buyer: { type: mongoose.Types.ObjectId, ref: "users" },
    orderDetails: [{ type: mongoose.Types.ObjectId, ref: "orderDetails" }]
}, { timestamps: true });

const Order = mongoose.model('orders', OrderSchema);

module.exports = Order;