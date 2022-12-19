const express = require('express');
const router = express.Router();

const UserRoutes = require('../domains/user');
const AdminRoutes = require('../domains/admin');
const ProductRoutes = require('../domains/product');
const AccountRoutes = require('../domains/account');
const PaymentRoutes = require('../domains/payment');
const OrderRoutes = require('../domains/order');
const GroupsRoutes = require('../domains/group');

router.use('/user', UserRoutes);
router.use('/admin', AdminRoutes);
router.use('/product', ProductRoutes);
router.use('/account', AccountRoutes);
router.use('/payment', PaymentRoutes);
router.use('/order', OrderRoutes);
router.use('/group', GroupsRoutes);

module.exports = router;