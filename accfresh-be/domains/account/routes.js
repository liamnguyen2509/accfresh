// domain functions
const { getAccounts, createAccounts, getAccountsByUser, getAccountsByOrderDetail } = require('./controller');

// utils
const { responseJSON } = require('../../util/responseJSON');

const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const accounts = await getAccounts();
        res.status(200).json(responseJSON('S', 'Get Accounts successful.', { accounts: accounts }));
    } catch (e) {
        res.status(400).json(responseJSON('SWR', e.message));
    }
});

router.post('/byUser', async (req, res) => {
    try {
        const { userId } = req.body;
        const accounts = await getAccountsByUser(userId);
        res.status(200).json(responseJSON('S', 'Get Accounts successful.', accounts));
    } catch (e) {
        res.status(400).json(responseJSON('SWR', e.message));
    }
});

router.post('/byOrder', async (req, res) => {
    try {
        const { orderDetailId } = req.body;
        const accounts = await getAccountsByOrderDetail(orderDetailId);
        res.status(200).json(responseJSON('S', 'Get Accounts successful.', accounts));
    } catch (e) {
        res.status(400).json(responseJSON('SWR', e.message));
    }
});

router.post('/import', async (req, res) => {
    try {
        const accounts = req.body;
        const totalInserted = await createAccounts(accounts);
        res.status(200).json(responseJSON('S', 'Import Accounts successful.', { total: totalInserted }));
    } catch (e) {
        res.status(400).json(responseJSON('SWR', e.message));
    }
})

module.exports = router;