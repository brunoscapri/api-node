'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/product-controller');

router.delete('/:id', controller.delete);
router.post('/', controller.post);
router.put('/:id', controller.put);
router.get('/', controller.get);
router.get('/:slug', controller.getBySlug);
router.get('/admin/:id', controller.getById);
router.get('/tag/:tag', controller.getByTag);


module.exports = router;