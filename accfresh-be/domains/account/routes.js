// domain functions
const { getAccounts, createAccounts, getAccountsByUser, getAccountsByOrderDetail, deleteAccount } = require('./controller');

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
            const accounts = await getAccounts(search.toUpperCase(), page, pageSize);
            res.status(200).json(responseJSON('S', 'Get Accounts successful.', accounts));
        } catch (e) {
            res.status(400).json(responseJSON('SWR', e.message));
        }
    });
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
    let { authorization } = req.headers;

    userAuthVerification(authorization)
    .then(async () => {
        try {
            const { orderDetailId } = req.body;
            const accounts = await getAccountsByOrderDetail(orderDetailId);
            res.status(200).json(responseJSON('S', 'Get Accounts successful.', accounts));
        } catch (e) {
            res.status(400).json(responseJSON('SWR', e.message));
        }
    });
});

router.post('/import', async (req, res) => {
    try {
        const accounts = req.body;
        const totalInserted = await createAccounts(accounts);
        res.status(200).json(responseJSON('S', 'Import Accounts successful.', { total: totalInserted }));
    } catch (e) {
        res.status(400).json(responseJSON('SWR', e.message));
    }
});

router.post('/delete', async (req, res) => {
    const { authorization } = req.headers;
    const { accountId } = req.body;

    adminAuthVerification(authorization)
    .then(async () => {
        try {
            await deleteAccount(accountId);
            res.status(200).json(responseJSON('S', 'Delete Account successful.'));
        } catch (e) {
            res.status(400).json(responseJSON('SWR', e.message));
        }
    });
});

module.exports = router;