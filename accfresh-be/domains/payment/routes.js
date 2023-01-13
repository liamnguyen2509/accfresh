// domain functions
const { getReceiver, getRate, deposit, requestPerfectMoney, getLastedPayment, getPaymentById,
        getPaymentsByUser, getPayments, transferEvoucher } = require('./controller');

// utils
const { responseJSON } = require('../../util/responseJSON');
const { userAuthVerification } = require('../../util/jwt');

const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const payments = await getPayments();
        res.status(200).json(responseJSON('S', 'Get Payments successful.', payments));
    } catch (e) {
        res.status(400).json(responseJSON('SWR', e.message));
    }
});

router.post('/byCode', async (req, res) => {
    let { authorization } = req.headers;

    userAuthVerification(authorization)
    .then(async () => { 
        try {
            const { userId, paymentId } = req.body;
            const payment = await getPaymentById(userId, paymentId);
            res.status(200).json(responseJSON('S', 'Get Payment successful.', payment));
        } catch (e) {
            res.status(400).json(responseJSON('SWR', e.message));
        }
    });
});

router.post('/byUser', async (req, res) => {
    let { authorization } = req.headers;

    userAuthVerification(authorization)
    .then(async () => { 
        try {
            const { userId, limit } = req.body;
            const payments = await getPaymentsByUser(userId, limit);
            res.status(200).json(responseJSON('S', 'Get Payments successful.', payments));
        } catch (e) {
            res.status(400).json(responseJSON('SWR', e.message));
        }
    });
});


router.get('/lasted', async (req, res) => {
    try {
        const payment = await getLastedPayment();
        res.status(200).json(responseJSON('S', 'Get Payment successful.', payment));
    } catch (e) {
        res.status(400).json(responseJSON('SWR', e.message));
    }
});

router.get('/receiver', async (req, res) => {
    try {
        const receiver = await getReceiver();
        res.status(200).json(responseJSON('S', 'Get Receiver successful.', { receiver: receiver }));
    } catch (e) {
        res.status(400).json(responseJSON('SWR', e.message));
    }
});

router.post('/rate', async (req, res) => {
    const requestData = req.body;
    try {
        const rate = await getRate(requestData);
        res.status(200).json(responseJSON('S', 'Get Rate successful.', rate));
    } catch (e) {
        res.status(400).json(responseJSON('SWR', e.message));
    }
});

router.post('/deposit', async (req, res) => {
    const requestData = req.body;
    try {
        const transaction = await deposit(requestData);
        res.status(200).json(responseJSON('S', 'Request deposit successful.', transaction));
    } catch (e) {
        res.status(400).json(responseJSON('SWR', e.message));
    }
});

router.post('/transferevoucher', async (req, res) => {
    const requestData = req.body;
    try {
        const transfer = await transferEvoucher(requestData);
        res.status(200).json(responseJSON('S', 'Deposit by Evoucher successful.', transfer));
    } catch (e) {
        res.status(400).json(responseJSON('SWR', e.message));
    }
});

router.post('/pm', async (req, res) => {
    const requestData = req.body;
    try {
        const payment = await requestPerfectMoney(requestData);
        res.status(200).json(responseJSON('S', 'Request Perfect Money payment successful.', payment));
    } catch (e) {
        res.status(400).json(responseJSON('SWR', e.message));
    }
});

module.exports = router;