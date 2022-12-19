// models
const User = require('../user/models/user');
const Wallet = require('../user/models/wallet');
const Order = require('./models/order');
const OrderDetails = require('./models/orderDetails');
const Product = require('../product/model');
const Account = require('../account/model');

const getOrders = async () => {
    const orders = await Order.find({})
                              .populate("buyer").sort({ createdAt: -1 });
    
    for await (const order of orders) {
        order.orderDetails = await OrderDetails.find({ order: order._id }).populate("product");
    }
    return orders;
}

const getOrdersByUser = async (userId) => {
    const orders = await Order.find({ buyer: userId }).sort({ createdAt: -1 });
    
    for await (const order of orders) {
        order.orderDetails = await OrderDetails.find({ order: order._id }).populate("product");
    }
    return orders;
}

const submitOrder = async (order) => {
    const buyer = await User.findOne({ email: order.buyerEmail }).populate('wallet');
    
    // update wallet
    if (!buyer.wallet || buyer.wallet.balance <= 0) { throw Error("Your wallet is not have enought balance."); } else { 
        const wallet = await Wallet.findById(buyer.wallet._id);
        wallet.balance = (wallet.balance - order.totalAmount).toFixed(2);
        await wallet.save();
    
        // create order
        //// link product list to order
        const newOrder = new Order({
            totalAmount: order.totalAmount,
            buyer: buyer
        });
        const updatedOrder = await newOrder.save();
    
        for await (const item of order.items) {
            // order details
            const product = await Product.findById(item.id);
            const accountWillBeSold = await Account.find({ product: product._id, isActive: true, isSold: false }).limit(item.quantity);
            if (accountWillBeSold.length <= 0 || accountWillBeSold.length < item.quantity) { 
                await Order.findByIdAndRemove({ _id: updatedOrder._id });
                throw Error("One of your items is not enought stock."); 
            } else {
                product.stock = product.stock - item.quantity;
                product.sold = product.sold + item.quantity;
                await product.save();
        
                const createdOrderDetail = new OrderDetails ({
                    quantity: item.quantity,
                    amount: item.quantity * item.price,
                    order: updatedOrder,
                    product: product
                });
                await createdOrderDetail.save();
        
                // assing accounts
                for await (const account of accountWillBeSold) {
                    account.isSold = true;
                    account.orderDetail= createdOrderDetail._id;
                    await account.save();
                }
            }
        }

        return newOrder;
    };

    
}

module.exports = { getOrders, getOrdersByUser, submitOrder }