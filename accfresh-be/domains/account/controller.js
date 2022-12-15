// models
const Account = require('./model');

const getAccounts = async () => {
    const accounts = await Account.find({}).populate("group");
    return accounts;
}

module.exports = { getAccounts }