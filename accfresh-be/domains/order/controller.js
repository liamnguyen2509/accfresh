// models
const User = require('../user/models/user');
const Wallet = require('../user/models/wallet');
const Order = require('./models/order');
const OrderDetails = require('./models/orderDetails');
const Product = require('../product/model');
const Account = require('../account/model');
const ObjectId = require('mongoose').Types.ObjectId;

const getOrders = async (search, page, pageSize) => {
    const skip = (page - 1) * pageSize;
    const searchId = ObjectId.isValid(search) ? ObjectId(search) : '';

    const orders = await OrderDetails.find({ $or: [
                                                    { 'order.buyer': { $regex: search, $options: 'i' } },
                                                    { 'order._id': searchId }
                                                ]})                                
                                     .populate({ path: 'product', select: 'name' })
                                     .sort({ createdAt: -1 })
                                     .skip(skip)
                                     .limit(pageSize);

    const totalRows = await OrderDetails.countDocuments();
    const result = {
        startRecord: skip + 1,
        endRecord: skip + parseInt(orders.length),
        totalRecords: totalRows,
        totalPages: Math.ceil(totalRows/pageSize),
        orders: orders.map(orderDetails => {
            return {
                id: orderDetails.order._id,
                buyer: orderDetails.order.buyer,
                orderDetailId: orderDetails._id,
                product: orderDetails.product.name,
                quantity: orderDetails.quantity,
                amount: orderDetails.amount,
                orderDate: orderDetails.createdAt
            }
        })
    }

    return result;
}

const getOrdersByUser = async (userId, limit) => {
    const buyer = await User.findById(userId);
    let orders;

    if (limit) {
        orders = await OrderDetails.find({ 'order.buyer': buyer.email })                                
                                    .populate({ path: 'product', select: 'name' })
                                    .sort({ createdAt: -1 })
                                    .limit(limit);
    } else {
        orders = await OrderDetails.find({ 'order.buyer': buyer.email })                                
                                    .populate({ path: 'product', select: 'name' })
                                    .sort({ createdAt: -1 });
    }
    
    return orders.map(orderDetails => {
        return {
            id: orderDetails.order._id,
            buyer: orderDetails.order.buyer,
            orderDetailId: orderDetails._id,
            product: orderDetails.product.name,
            quantity: orderDetails.quantity,
            amount: orderDetails.amount,
            orderDate: orderDetails.createdAt
        }
    });
}

const submitOrder = async (order) => {
    const buyer = await User.findOne({ email: order.buyerEmail }).populate('wallet');
    console.log(`---Buyer: ${buyer.email}. Has balance: ${buyer.wallet.balance}`);
    
    // check wallet balance
    console.log(`---Buyer has wallet is: ${buyer.wallet}`);
    console.log(`---Buyer has wallet less then 0: ${buyer.wallet.balance <= 0}`);
    console.log(`---Buyer has wallet not enough order: ${parseFloat(buyer.wallet.balance) < order.totalAmount}. with order amount is: ${order.totalAmount}`)
    if (!buyer.wallet || parseFloat(buyer.wallet.balance) <= 0 || parseFloat(buyer.wallet.balance) < parseFloat(order.totalAmount) || isNaN(buyer.wallet.balance)) { 
        throw Error("Your wallet is out of balance."); 
    } else { 
        let inStock = true;
        for await (const itemInCart of order.items) {
            const product = await Product.findById(itemInCart.id);
            if (product.stock <= 0 || product.stock < itemInCart.quantity) {
                inStock = false;
                throw Error("One of your items is out of stock."); 
            } else {
                const accountWillBeSold = await Account.find({ product: product._id, isActive: true, isSold: false }).limit(itemInCart.quantity);
                console.log(`---Total Account can be sell is: ${accountWillBeSold.length}`);
                // check product quantity
                console.log(`---Product ordering has quantity less than 0: ${product.quantity <= 0}`);
                console.log(`---Total account can sell less than 0: ${accountWillBeSold.length <= 0}`);
                console.log(`---Total account can sell has quantity less than quantity of order: ${accountWillBeSold.length < itemInCart.quantity}. Order need ${itemInCart.quantity}`);
                if (accountWillBeSold.length <= 0 || accountWillBeSold.length < itemInCart.quantity) {
                    inStock = false;
                    throw Error("One of your items is out of stock."); 
                }
            }
        }

        if (inStock) {
            const wallet = await Wallet.findById(buyer.wallet._id);
            console.log(`---Wallet of buyer has balance: ${wallet.balance}`);
            wallet.balance = wallet.balance - order.totalAmount;
            console.log(`---Wallet of buyer has balance after update: ${wallet.balance}`);
            await wallet.save();

            return await Order.create({
                buyer,
                totalAmount: order.totalAmount
            }).then(createdOrder => {
                order.items.map(async item => {
                    const product = await Product.findById(item.id);
                    await OrderDetails.create({
                        quantity: item.quantity,
                        amount: (item.quantity * item.price).toFixed(2),
                        order: {
                            _id: createdOrder._id,
                            buyer: buyer.email
                        },
                        product: product._id
                    }).then(async createdOrderDetails => {
                        // add orderdetails to order
                        await Order.findByIdAndUpdate(
                            createdOrder._id, 
                            { $addToSet: { orderDetails: createdOrderDetails._id }},
                            { new: true, useFindAndModify: false }
                        );

                        // get accounts
                        const accountCutOff = await Account.find({ product: product._id, isActive: true, isSold: false }).limit(createdOrderDetails.quantity);
                        console.log(`Total account cut off is: ${accountCutOff.length}`);
                        for await (const account of accountCutOff) {
                            await Account.findByIdAndUpdate(
                                account._id,
                                {
                                    isSold: true,
                                    orderDetail: createdOrderDetails._id
                                },
                                { new: true, useFindAndModify: false }
                            );

                            await OrderDetails.findByIdAndUpdate(
                                createdOrderDetails._id,
                                { $addToSet: { accounts: account.content }},
                                { new: true, useFindAndModify: false }
                            );
                        }

                        // update product stock and sold
                        console.log(`---Quantity Need for order: ${item.quantity}`);
                        console.log(`---Product stock before order: ${product.stock}`);
                        console.log(`---Product sold before order: ${product.sold}`);

                        product.stock = product.stock - accountCutOff.length;
                        product.sold = product.sold + accountCutOff.length;
                        await product.save();

                        console.log(`---Product stock after order: ${product.stock}`);
                        console.log(`---Product sold after order: ${product.sold}`);
                    });
                });
            });
        }
    };
}

const fixOrderData = async () => {
    const orderDetails = await OrderDetails.find().sort({ createdAt: -1 }).limit(20);
    for await (const orderDetail of orderDetails) {
        const order = await Order.findById(orderDetail.order).populate('buyer');
        await OrderDetails.findByIdAndUpdate(
            orderDetail._id, 
            {
                order: {
                    _id: order._id,
                    buyer: order.buyer.email
                }
            },
            { new: true, useFindAndModify: false });
        
        const accountsByOrder = await Account.find({ orderDetail: orderDetail._id });
        for await (const account of accountsByOrder) {
            await OrderDetails.findByIdAndUpdate(
                orderDetail._id, 
                { 
                    $addToSet: { accounts: account.content } 
                },
                { new: true, useFindAndModify: false });
        }
    }
    return "Fixed completed";
}

module.exports = { getOrders, getOrdersByUser, submitOrder, fixOrderData }