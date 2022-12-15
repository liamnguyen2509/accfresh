// domain functions
const { validateAdmin, authenticateAdmin } = require('./controller');

// utils
const { responseJSON } = require('../../util/responseJSON');

const express = require('express');
const router = express.Router();

// authenticate
router.post('/authenticate', async (req, res) => {
    let { email, password} = req.body;

    const isValid = await validateAdmin(email, password);
    if (!isValid) return res.status(400).json(responseJSON('ID', 'Your email or password is invalid.'));

    try {
        const fetchedAdmin = await authenticateAdmin(email, password);
        res.status(200).json(responseJSON('S', 'Authenticate User successful.', { admin: fetchedAdmin }));
    } catch (e) {
        res.status(400).json(responseJSON('SWR', e.message));
    }
});

module.exports = router;