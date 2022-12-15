// domain functions
const { getProducts } = require('./controller');

// utils
const { responseJSON } = require('../../util/responseJSON');

const express = require('express');
const router = express.Router();

// authenticate
router.get('/', async (req, res) => {
    try {
        const products = await getProducts();
        res.status(200).json(responseJSON('S', 'Get Products successful.', { products: products }));
    } catch (e) {
        res.status(400).json(responseJSON('SWR', e.message));
    }
});

module.exports = router;