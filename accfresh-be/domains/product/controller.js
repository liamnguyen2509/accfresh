// models
const Product = require('./model');

const getProducts = async () => {
    const products = await Product.find().sort({ createdAt: -1 });

    return products;
}

const getProductsByGroup = async (groupId) => {
    const products = await Product.find({ group: groupId });

    return products;
}

const createProduct = async (requestProduct) => {
    const existingProduct = await Product.findOne({ name: requestProduct.name });

    if (existingProduct) {
        throw Error(`Product ${requestProduct.name} already existed.`);
    } else {
        const newProduct = new Product({
            name: requestProduct.name,
            description: requestProduct.description,
            image: requestProduct.image,
            stock: requestProduct.stock,
            sold: requestProduct.sold,
            price: requestProduct.price,
            isActive: true
        });
    
        const product = await newProduct.save().catch((err) => {
            throw Error("Create Product failed.");
        });
    
        return product;
    }
}


const updateProduct = async (requestProduct) => {
    const productUpdate = await Product.findById(requestProduct.id);

    if (!productUpdate) {
        throw Error(`Product ${requestProduct.name} not exist.`);
    } else {
        productUpdate.name = requestProduct.name;
        productUpdate.description = requestProduct.description;
        productUpdate.stock = requestProduct.stock;
        productUpdate.sold = requestProduct.sold;
        productUpdate.price = requestProduct.price;
        productUpdate.image = requestProduct.image;
    
        const updatedProduct = await productUpdate.save().catch((err) => {
            throw Error("Update Product failed.");
        });
    
        return updatedProduct;
    }
}

const deleteProduct = async (productId) => {
    await Product.deleteOne({ _id: productId }).catch((err) => {
        throw Error("Delete Product failed.");
    });;
}

module.exports = { getProducts, getProductsByGroup, deleteProduct, updateProduct, createProduct }