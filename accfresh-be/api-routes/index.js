const express = require('express');
const router = express.Router();

const UserRoutes = require('../domains/user');
const AdminRoutes = require('../domains/admin');
const ProductRoutes = require('../domains/product');
const AccountRoutes = require('../domains/account');

router.use('/user', UserRoutes);
router.use('/admin', AdminRoutes);
router.use('/product', ProductRoutes);
router.use('/account', AccountRoutes);

module.exports = router;