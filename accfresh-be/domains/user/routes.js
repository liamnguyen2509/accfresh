// domain functions
const { validateUser, authenticateUser, registerUser } = require('./controller');

// utils
const { responseJSON } = require('../../util/responseJSON');
const { validateEmail } = require('../../util/email');

const express = require('express');
const router = express.Router();

// authenticate
router.post('/authenticate', async (req, res) => {
    let { email, password} = req.body;

    const isValid = await validateUser(email, password);
    if (!isValid) return res.status(400).json(responseJSON('ID', 'Your email or password is invalid.'));

    try {
        const fetchedUser = await authenticateUser(email, password);
        res.status(200).json(responseJSON('S', 'Authenticate User successful.', { user: fetchedUser }));
    } catch (e) {
        res.status(400).json(responseJSON('SWR', e.message));
    }
});

// sign up
router.post('/signup', async(req, res) => {
    let { username, email, password } = req.body;

    const isValidEmail = await validateEmail(email);
    if (!isValidEmail) return res.status(400).json(responseJSON('ID', 'Your email is invalid format.'));

    try {
        const registedUser = await registerUser(username, email, password);
        res.status(200).json(responseJSON('S', 'Registering User successful.', { user: registedUser }));
    } catch (e) {
        res.status(400).json(responseJSON('SWR', e.message));
    }
});

module.exports = router;