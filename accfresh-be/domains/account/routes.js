// domain functions
const { getAccounts } = require('./controller');

// utils
const { responseJSON } = require('../../util/responseJSON');

const express = require('express');
const router = express.Router();

// authenticate
router.get('/', async (req, res) => {
    try {
        const accounts = await getAccounts();
        res.status(200).json(responseJSON('S', 'Get Products successful.', { accounts: accounts }));
    } catch (e) {
        res.status(400).json(responseJSON('SWR', e.message));
    }
});

module.exports = router;