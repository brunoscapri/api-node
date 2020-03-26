'use strict';
const express = require('express');
const router = express.Router();
const controller = require('../controllers/order-controller');
const auth = require('../services/auth-service');

router.get('/', auth.autorize, controller.get);
router.post('/', auth.autorize, controller.post);

module.exports = router;