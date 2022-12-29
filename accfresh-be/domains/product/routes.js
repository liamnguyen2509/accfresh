// domain functions
const { getProducts, getProductsByGroup, deleteProduct, updateProduct, createProduct } = require('./controller');

// utils
const { responseJSON } = require('../../util/responseJSON');
const { userAuthVerification, adminAuthVerification } = require('../../util/jwt');

const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const products = await getProducts();
        res.status(200).json(responseJSON('S', 'Get Products successful.', { products: products }));
    } catch (e) {
        res.status(400).json(responseJSON('SWR', e.message));
    }
});

router.post('/', async (req, res) => {
    const { authorization } = req.headers;
    const requestProduct = req.body;

    adminAuthVerification(authorization)
    .then(async () => {
        try {
            const product = await createProduct(requestProduct);
            res.status(200).json(responseJSON('S', 'Create Product successful.', product));
        } catch (e) {
            res.status(400).json(responseJSON('SWR', e.message));
        }
    });
});

router.put('/', async (req, res) => {
    const { authorization } = req.headers;
    const requestProduct = req.body;

    adminAuthVerification(authorization)
    .then(async () => {
        try {
            const product = await updateProduct(requestProduct);
            res.status(200).json(responseJSON('S', 'Update Product successful.', product));
        } catch (e) {
            res.status(400).json(responseJSON('SWR', e.message));
        }
    });
});

router.post('/byGroup', async (req, res) => {
    try {
        const { groupId } = req.body;
        const products = await getProductsByGroup(groupId);
        res.status(200).json(responseJSON('S', 'Get Products successful.', products));
    } catch (e) {
        res.status(400).json(responseJSON('SWR', e.message));
    }
});

router.post('/delete', async (req, res) => {
    const { authorization } = req.headers;
    const { productId } = req.body;

    adminAuthVerification(authorization)
    .then(async () => {
        try {
            await deleteProduct(productId);
            res.status(200).json(responseJSON('S', 'Delete Product successful.'));
        } catch (e) {
            res.status(400).json(responseJSON('SWR', e.message));
        }
    });
});

module.exports = router;