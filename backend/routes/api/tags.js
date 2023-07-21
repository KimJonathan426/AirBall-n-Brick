const express = require('express');
const asyncHandler = require('express-async-handler');

const { Tag } = require('../../db/models');

const router = express.Router();

router.get('/', asyncHandler(async (_req, res) => {
    const tags = await Tag.findAll();

    return res.json({
        tags
    });
}));

module.exports = router;
