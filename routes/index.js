const express = require('express');
const router = express.Router();

const mainRouter = require('./main/index.js');
const boardRouter = require('./board/index.js');

router.use('/',mainRouter);
router.use('/board',boardRouter);

module.exports = router;