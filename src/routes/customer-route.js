'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/customer-controller');
const auth = require('../services/auth-service')

router.post('/', controller.post);
router.post('/authenticate', controller.authenticate);
router.get('/', controller.get);
router.post('/refreshtoken', auth.autorize, controller.refreshToken);

module.exports = router;