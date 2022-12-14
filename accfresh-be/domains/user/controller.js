const sha256 = require('sha256');

const { newAuthToken } = require('../../util/jwt');

// models
const User = require('./model');

const validate = async (email, password) => {
    var emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    
    if (!email || !email.match(emailRegex)) return false;
    if (!password) return false;

    return true;
}

const authenticateUser = async (email, password) => {
    const fetchedUser = await User.findOne({ email });
    if (!fetchedUser) throw Error("Invalid credentials. Your email is not exist.");

    const passwordHash = sha256(password);
    if (passwordHash !== fetchedUser.password) throw Error("Invalid credentials. Your password is not correct.");

    try {
        const filter = { _id: fetchedUser._id };
        const update = { $set: { authToken: newAuthToken() } };
        let updatedUser = User.findOneAndUpdate(filter, update, { new: true });
        
        return updatedUser;
    } catch (e) {
        throw Error("Update token failed.");
    }
}

module.exports = { validate, authenticateUser }