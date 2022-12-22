// models
const Order = require('../order/models/order');
const OrderDetails = require('../order/models/orderDetails');
const Account = require('./model');
const Product = require('../product/model');

const getAccounts = async (query, page) => {
    const accounts = await Account.find({ content: { $regex: query, $options: "i" } }).sort({ createdAt: -1 }).populate("product").skip(page * 20).limit(20);
    return accounts;
}

const getAccountsByUser = async (userId) => {
    const ordersByUser = await Order.find({ buyer: userId }).sort({ createdAt: -1 });

    const accounts = [];
    for await (const order of ordersByUser) {
        const orderDetails = await OrderDetails.find({ order: order._id }).sort({ createdAt: -1 });
        for await (const orderDetail of orderDetails) {
            const accountsByOrderDetail = await Account.find({ orderDetail: orderDetail._id }).sort({ updatedAt: -1 }).populate("product");
            accounts.push(...accountsByOrderDetail);
        }
    }

    return accounts;
}

const getAccountsByOrderDetail = async (orderDetailId) => {
    const accounts = await Account.find({ orderDetail: orderDetailId }).populate("product");
    return accounts;
}

const createAccounts = async (accounts) => {
    const product = await Product.findById(accounts[0].productId);

    const newAccounts = [];
    for await (const account of accounts) {
        newAccounts.push(new Account({
            content: account.line,
            isSold: false,
            isActive: true,
            product: product
        }));
    }

    let totalInserted = 0;
    await Account.insertMany(newAccounts)
                 .then(docs => totalInserted += docs.length)
                 .catch((err) => {
                    throw Error(err.message);
                 });

    // update instock value of product
    product.stock = product.stock + totalInserted;
    product.isActive = true;
    await product.save();

    return totalInserted;
}

module.exports = { getAccounts, createAccounts, getAccountsByUser, getAccountsByOrderDetail }