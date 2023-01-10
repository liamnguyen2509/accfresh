// domain functions
const { validateUser, authenticateUser, registerUser, GetBalance, getUsers, getUserById, deleteUser } = require('./controller');

// utils
const { responseJSON } = require('../../util/responseJSON');
const { validateEmail } = require('../../util/email');
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
            const users = await getUsers(search.toUpperCase(), page, pageSize);
            res.status(200).json(responseJSON('S', 'Get Users successful.', users));
        } catch (e) {
            res.status(400).json(responseJSON('SWR', e.message));
        }
    });
});

router.post('/byId', async(req, res) => {
    let { authorization } = req.headers;
    const { userId } = req.body;
    
    userAuthVerification(authorization)
    .then(async () => {
        try {
            const user = await getUserById(userId);
            res.status(200).json(responseJSON('S', "Get User successful.", user));
        } catch (e) {
            res.status(400).json(responseJSON('SWR', e.message));
        }
    });
});

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

// balance
router.post('/balance', async(req, res) => {
    let { authorization } = req.headers;
    const { userId } = req.body;
    
    userAuthVerification(authorization)
    .then(async () => {
        try {
            const balance = await GetBalance(userId);
            res.status(200).json(responseJSON('S', "Get User's balance successful.", balance));
        } catch (e) {
            res.status(400).json(responseJSON('SWR', e.message));
        }
    });
});

router.post('/delete', async (req, res) => {
    const { authorization } = req.headers;
    const { userId } = req.body;

    adminAuthVerification(authorization)
    .then(async () => {
        try {
            await deleteUser(userId);
            res.status(200).json(responseJSON('S', 'Delete User successful.'));
        } catch (e) {
            res.status(400).json(responseJSON('SWR', e.message));
        }
    });
});

module.exports = router;