// domain functions
const { getOrders, submitOrder, getOrdersByUser } = require('./controller');

// utils
const { responseJSON } = require('../../util/responseJSON');

const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const orders = await getOrders();
        res.status(200).json(responseJSON('S', 'Get Orders successful.', orders));
    } catch (e) {
        res.status(400).json(responseJSON('SWR', e.message));
    }
});

router.post('/byUser', async (req, res) => {
    try {
        const { userId } = req.body;
        const orders = await getOrdersByUser(userId);
        res.status(200).json(responseJSON('S', 'Get Orders successful.', orders));
    } catch (e) {
        res.status(400).json(responseJSON('SWR', e.message));
    }
});

router.post('/', async (req, res) => {
    const requestData = req.body;
    try {
        const order = await submitOrder(requestData);
        res.status(200).json(responseJSON('S', 'Order placed successful.', order));
    } catch (e) {
        res.status(400).json(responseJSON('SWR', e.message));
    }
});

module.exports = router;