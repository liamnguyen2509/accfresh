// domain functions
const { getProducts, getProductsByGroup } = require('./controller');

// utils
const { responseJSON } = require('../../util/responseJSON');

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

router.post('/byGroup', async (req, res) => {
    try {
        const { groupId } = req.body;
        const products = await getProductsByGroup(groupId);
        res.status(200).json(responseJSON('S', 'Get Products successful.', products));
    } catch (e) {
        res.status(400).json(responseJSON('SWR', e.message));
    }
});

module.exports = router;