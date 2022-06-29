const express = require('express');
const asyncHandler = require('express-async-handler');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, Image } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

router.get('/', asyncHandler(async (_req, res) => {
    const spots = await Spot.findAll({
        include: [User]
    });
    const images = await Image.findAll();

    res.json({
        spots,
        images
    });
}));

router.post('/', asyncHandler(async (req, res) => {
    const { userId, address, city, state, country, name, description, price } = req.body;
    const { url1, url2, url3, url4, url5 } = req.body;

    const spot = await Spot.create({ userId, address, city, state, country, name, description, price });
    console.log('spot', spot)

    const spotId = spot.id;
    const image1 = await Image.create({ spotId, url: url1 });
    const image2 = await Image.create({ spotId, url: url2 });
    const image3 = await Image.create({ spotId, url: url3 });
    const image4 = await Image.create({ spotId, url: url4 });
    const image5 = await Image.create({ spotId, url: url5 });

    const images = [image1, image2, image3, image4, image5];

    return res.json({
        spot,
        images
    });
}))

module.exports = router;
