// models
const Group = require('./model');
const Product = require('../product/model');

const getGroups = async () => {
    const groups = await Group.find().sort({ createdAt: -1 });

    const returnGroups = [];
    for await (const group of groups) {
        const productsByGroups = await Product.find({ group: group._id });
        
        const total = productsByGroups.reduce(({ stock, sold }, product) => {
            return  { stock: stock + product.stock, sold: sold + product.sold };
        }, { stock: 0, sold: 0 });

        returnGroups.push({
            name: group.name,
            image: group.image,
            stock: total.stock,
            sold: total.sold,
            price: productsByGroups.sort((a, b) => a.price - b.price)[0].price,
            isActive: group.isActive
        });
    }
    return returnGroups;
}

module.exports = { getGroups }