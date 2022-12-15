// models
const Product = require('./model');

const getProducts = async () => {
    const products = await Product.find();

    return products;
}

module.exports = { getProducts }