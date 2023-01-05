// domain functions
const { getOrders, submitOrder, getOrdersByUser, fixOrderData } = require('./controller');

// utils
const { responseJSON } = require('../../util/responseJSON');
const { userAuthVerification, adminAuthVerification } = require('../../util/jwt');

const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    let { authorization } = req.headers;
    const search = req.query.search;
    const page = req.query.page;
    const pageSize = req.query.pageSize;

    adminAuthVerification(authorization)
    .then(async () => { 
        try {
            const orders = await getOrders(search.toUpperCase(), page, pageSize);
            res.status(200).json(responseJSON('S', 'Get Orders successful.', orders));
        } catch (e) {
            res.status(400).json(responseJSON('SWR', e.message));
        }
    });
});

// router.get('/fixOrderData', async (req, res) => {
//     try {
//         const result = await fixOrderData();
//         res.status(200).json(responseJSON('S', result));
//     } catch (e) {
//         res.status(400).json(responseJSON('SWR', e.message));
//     }
// });


router.post('/byUser', async (req, res) => {
    let { authorization } = req.headers;

    userAuthVerification(authorization)
    .then(async () => { 
        try {
            const { userId } = req.body;
            const orders = await getOrdersByUser(userId);
            res.status(200).json(responseJSON('S', 'Get Orders successful.', orders));
        } catch (e) {
            res.status(400).json(responseJSON('SWR', e.message));
        }
    });
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