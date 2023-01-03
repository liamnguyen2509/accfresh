// models
const User = require('../user/models/user');
const Wallet = require('../user/models/wallet');
const Order = require('./models/order');
const OrderDetails = require('./models/orderDetails');
const Product = require('../product/model');
const Account = require('../account/model');

const getOrders = async (search, page, pageSize) => {
    const skip = (page - 1) * pageSize;

    const orders = await OrderDetails.find()
                                     .populate({ path: 'order', select: '_id buyer', populate: { path: 'buyer', select: 'email' } })
                                     .populate({ path: 'product', select: 'name' }).sort({ createdAt: -1 });

    const filteredOrders = orders.filter(orderDetails => orderDetails.order.buyer.email.toUpperCase().includes(search) 
    || orderDetails.order._id.toString().toUpperCase().includes(search)).slice(skip, skip + parseInt(pageSize));
    
    const totalRows = orders.length;
    const result = {
        totalPages: Math.ceil(totalRows/pageSize),
        orders: filteredOrders.map(orderDetails => {
            return {
                id: orderDetails.order._id,
                buyer: orderDetails.order.buyer.email,
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
    if (!buyer.wallet || buyer.wallet.balance <= 0 || parseFloat(buyer.wallet.balance) < order.totalAmount) { throw Error("Your wallet is not have enought balance."); } else { 
        const wallet = await Wallet.findById(buyer.wallet._id);
    
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
                wallet.balance = (wallet.balance - order.totalAmount).toFixed(2);
                await wallet.save();

                product.stock = product.stock - item.quantity;
                product.sold = product.sold + item.quantity;
                await product.save();
        
                const newOrderDetails = new OrderDetails ({
                    quantity: item.quantity,
                    amount: (item.quantity * item.price).toFixed(2),
                    order: updatedOrder._id,
                    product: product._id
                });
                const createdOrderDetail = await newOrderDetails.save();
                await Order.findByIdAndUpdate(updatedOrder._id, { $addToSet: { orderDetails: createdOrderDetail._id } });
        
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

const fixOrderData = async () => {
    const orders = await Order.find();
    for await (const order of orders) {
        const orderDetails = await OrderDetails.find({ order: order._id });
        for await (const detail of orderDetails) {
            await Order.findByIdAndUpdate(order._id, { $addToSet: { orderDetails: detail._id } });
        }
    }
    return "Fixed completed";
}

module.exports = { getOrders, getOrdersByUser, submitOrder, fixOrderData }