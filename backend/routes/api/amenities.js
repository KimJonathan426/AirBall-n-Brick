const express = require('express');
const asyncHandler = require('express-async-handler');

const { Amenity } = require('../../db/models');

const router = express.Router();

router.get('/', asyncHandler(async (_req, res) => {
    const amenities = await Amenity.findAll();

    return res.json({
        amenities
    });
}));

module.exports = router;
