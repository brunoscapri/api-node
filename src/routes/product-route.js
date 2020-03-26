'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/product-controller');
const auth = require('../services/auth-service');

router.delete('/:id', auth.isAdmin, controller.delete);
router.post('/', auth.isAdmin, controller.post);
router.put('/:id', auth.isAdmin, controller.put);
router.get('/', controller.get);
router.get('/:slug', controller.getBySlug);
router.get('/admin/:id', controller.getById);
router.get('/tag/:tag', controller.getByTag);


module.exports = router;