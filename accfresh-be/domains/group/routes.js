// domain functions
const { getGroups } = require('./controller');

// utils
const { responseJSON } = require('../../util/responseJSON');
const { userAuthVerification } = require('../../util/jwt');

const express = require('express');
const router = express.Router();

// authenticate
router.get('/', async (req, res) => {
    try {
        const groups = await getGroups();
        res.status(200).json(responseJSON('S', 'Get Groups successful.', groups));
    } catch (e) {
        res.status(400).json(responseJSON('SWR', e.message));
    }
});

module.exports = router;