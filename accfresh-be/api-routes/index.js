const express = require('express');
const router = express.Router();

const UserRoutes = require('../domains/user');
const ProductRoutes = require('../domains/product');

router.use('/user', UserRoutes);
router.use('/product', ProductRoutes);

module.exports = router;