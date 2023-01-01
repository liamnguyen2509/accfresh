const sha256 = require('sha256');

const { newAuthToken } = require('../../util/jwt');

// models
const User = require('./models/user');
const Wallet = require('./models/wallet');

const validateUser = async (email, password) => {
    var emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    
    if (!email || !email.match(emailRegex)) return false;
    if (!password) return false;

    return true;
}

const authenticateUser = async (email, password) => {
    const fetchedUser = await User.findOne({ email }).populate('wallet');
    if (!fetchedUser) throw Error("Invalid credentials. Your email is not exist.");

    const passwordHash = sha256(password);
    if (passwordHash !== fetchedUser.password) throw Error("Invalid credentials. Your password is not correct.");

    try {
        const filter = { _id: fetchedUser._id };
        const update = { $set: { authToken: newAuthToken() } };
        await User.findOneAndUpdate(filter, update, { new: true });
        
        return fetchedUser;
    } catch (e) {
        // throw Error("Update token failed.");
        throw Error(e.message);
    }
}

const registerUser = async (username, email, password) => {
    if (!username || !password) throw Error("Please enter your username or password.");

    const fetchedUser = await User.findOne({ email });
    if (fetchedUser) throw Error("Registering failed. Your email existing.");

    const newWallet = new Wallet({
        balance: 0,
        previousBalance: 0
    });

    let createdWallet = await newWallet.save().catch((err) => {
        throw Error("Create wallet for User failed.");
    });

    const passwordHash = sha256(password);
    const newUser = new User({
        username,
        email,
        password: passwordHash,
        authToken: newAuthToken(),
        wallet: createdWallet
    });

    let registedUser = await newUser.save().catch((err) => {
        throw Error("Register new User failed.");
    });

    return registedUser;
}

const GetBalance = async (userId) => {
    const user = await User.findById(userId).populate('wallet');
    return user.wallet.balance;
}

const getUsers = async (search, page, pageSize) => {
    const skip = (page - 1) * pageSize;
    const users = await User.find({ $or: [{ username: { $regex: search } }, { email: { $regex: search } }]})
                            .sort({ createdAt: -1 }).populate("wallet").skip(skip).limit(pageSize);
    
    const totalRows = await User.countDocuments();
    const result = {
        totalPages: Math.ceil(totalRows/pageSize),
        users: users
    }

    return result;
}

module.exports = { validateUser, authenticateUser, registerUser, GetBalance, getUsers }