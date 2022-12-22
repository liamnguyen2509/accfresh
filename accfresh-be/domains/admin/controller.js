const sha256 = require('sha256');

const { newAuthToken } = require('../../util/jwt');

// models
const Admin = require('./model');

const validateAdmin = async (email, password) => {
    var emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    
    if (!email || !email.match(emailRegex)) return false;
    if (!password) return false;

    return true;
}

const authenticateAdmin = async (email, password) => {
    const fetchedUser = await Admin.findOne({ email });
    if (!fetchedUser) throw Error("Invalid credentials. Your email is not exist.");

    const passwordHash = sha256(password);
    if (passwordHash !== fetchedUser.password) throw Error("Invalid credentials. Your password is not correct.");

    try {
        const filter = { _id: fetchedUser._id };
        const update = { $set: { authToken: newAuthToken() } };
        let updatedUser = Admin.findOneAndUpdate(filter, update, { new: true });
        
        return updatedUser;
    } catch (e) {
        throw Error("Update token failed.");
    }
}

const getInfo = async (email) => {
    const admin = await Admin.findOne({ email: email });
    return admin;
}

const updateBankAccount = async (name, account) => {
    const admin = await Admin.findOne();
    admin.bank = name;
    admin.bankAccount = account;

    const updatedAdmin = await admin.save();
    return updatedAdmin;
}

module.exports = { validateAdmin, authenticateAdmin, getInfo, updateBankAccount }