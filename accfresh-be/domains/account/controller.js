// models
const Order = require('../order/models/order');
const OrderDetails = require('../order/models/orderDetails');
const Account = require('./model');
const Product = require('../product/model');

const getAccounts = async (search, page, pageSize) => {
    const skip = (page - 1) * pageSize;
    const accounts = await Account.find({ content: { $regex: search, $options: 'i' } })
                                    .populate({ path: 'product', select: 'name' })
                                    .populate({ path: 'orderDetail', select: 'order.buyer.email' })
                                    .sort({ createdAt: -1 })
                                    .skip(skip)
                                    .limit(pageSize);
    
    const totalRows = await Account.countDocuments();
    const result = {
        startRecord: skip + 1,
        endRecord: skip + parseInt(accounts.length),
        totalRecords: totalRows,
        totalPages: Math.ceil(totalRows/pageSize),
        accounts: accounts
    }

    return result;
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

const deleteAccount = async (accountId) => {
    await Account.deleteOne({ _id: accountId }).catch((err) => {
        throw Error("Delete Account failed.");
    });
}

module.exports = { getAccounts, createAccounts, getAccountsByUser, getAccountsByOrderDetail, deleteAccount }