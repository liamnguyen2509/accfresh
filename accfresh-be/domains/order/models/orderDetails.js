const { Decimal128 } = require("bson");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderDetailsSchema = new Schema({
    quantity: Number,
    amount: Decimal128, 
    product: {type: mongoose.Types.ObjectId, ref: "products"},
    order: Object,
    accounts: []
}, { timestamps: true });

const OrderDetails = mongoose.model('orderDetails', OrderDetailsSchema);

module.exports = OrderDetails;