// models
const Product = require('./model');

const getProducts = async () => {
    const filter = { isActive: true };
    const products = await Product.find(filter);

    return products;
}

module.exports = { getProducts }