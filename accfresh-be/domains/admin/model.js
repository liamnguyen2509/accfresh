const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
    email: String,
    password: String,
    authToken: String,
    bank: String,
    bankAccount: String,
    phone: String
}, { timestamps: true });

const Admin = mongoose.model('admins', AdminSchema);

module.exports = Admin;