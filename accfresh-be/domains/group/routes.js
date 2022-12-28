// domain functions
const { getGroups, deleteGroup, createGroup, updateGroup } = require('./controller');

// utils
const { responseJSON } = require('../../util/responseJSON');
const { userAuthVerification, adminAuthVerification } = require('../../util/jwt');

const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const groups = await getGroups();
        res.status(200).json(responseJSON('S', 'Get Groups successful.', groups));
    } catch (e) {
        res.status(400).json(responseJSON('SWR', e.message));
    }
});

router.post('/', async (req, res) => {
    const { authorization } = req.headers;
    const requestGroup = req.body;

    adminAuthVerification(authorization)
    .then(async () => {
        try {
            const group = await createGroup(requestGroup);
            res.status(200).json(responseJSON('S', 'Create Group successful.', group));
        } catch (e) {
            res.status(400).json(responseJSON('SWR', e.message));
        }
    });
});

router.put('/', async (req, res) => {
    const { authorization } = req.headers;
    const requestGroup = req.body;

    adminAuthVerification(authorization)
    .then(async () => {
        try {
            const group = await updateGroup(requestGroup);
            res.status(200).json(responseJSON('S', 'Update Group successful.', group));
        } catch (e) {
            res.status(400).json(responseJSON('SWR', e.message));
        }
    });
});

router.post('/delete', async (req, res) => {
    const { authorization } = req.headers;
    const { groupId } = req.body;

    adminAuthVerification(authorization)
    .then(async () => {
        try {
            await deleteGroup(groupId);
            res.status(200).json(responseJSON('S', 'Delete Group successful.'));
        } catch (e) {
            res.status(400).json(responseJSON('SWR', e.message));
        }
    });
});

module.exports = router;