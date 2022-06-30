const express = require('express');
const asyncHandler = require('express-async-handler');

const { Review } = require('../../db/models');

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    console.log('=================== successfulyl reached backend route ===================')
}));

module.exports = router;
