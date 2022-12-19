// models
const Product = require('./model');

const getProducts = async () => {
    const products = await Product.find();

    return products;
}

const getProductsByGroup = async (groupId) => {
    const products = await Product.find({ group: groupId });

    return products;
}

module.exports = { getProducts, getProductsByGroup }