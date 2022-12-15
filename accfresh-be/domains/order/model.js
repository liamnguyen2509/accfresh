const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    
}, { timestamps: true });

const Order = mongoose.model('orders', OrderSchema);

module.exports = Order;