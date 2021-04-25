const express = require('express');
const router = express.Router();
const controller = require('./board.controller');

router.get('/list',controller.list);
router.get('/view',controller.view);

module.exports = router;