const express = require('express');
const asyncHandler = require('express-async-handler');

const { User, Spot, Image, Review } = require('../../db/models');

const router = express.Router();

router.get('/', asyncHandler(async (_req, res) => {
    const spots = await Spot.findAll({
        include: [User]
    });
    const images = await Image.findAll();

    return res.json({
        spots,
        images
    });
}));

router.post('/', asyncHandler(async (req, res) => {
    const { userId, address, city, state, country, name, description, price } = req.body;
    const { url1, url2, url3, url4, url5 } = req.body;

    const spot = await Spot.create({ userId, address, city, state, country, name, description, price });

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
}));

router.put('/:id', asyncHandler(async (req, res) => {
    const { id, userId, address, city, state, country, name, description, price } = req.body;
    const { url1, url2, url3, url4, url5 } = req.body;

    const spot = await Spot.findByPk(id, {
        include: [User]
    });
    const images = await Image.findAll({
        where: {
            spotId: id
        }
    });

    await spot.update({ userId, address, city, state, country, name, description, price });

    await images[0].update({ url: url1 });
    await images[1].update({ url: url2 });
    await images[2].update({ url: url3 });
    await images[3].update({ url: url4 });
    await images[4].update({ url: url5 });

    return res.json({
        spot,
        images
    });
}));

router.delete('/:id', asyncHandler(async (req, res) => {
    const spot = await Spot.findByPk(req.params.id);

    await spot.destroy();

    return res.json({ message: 'Successfully Deleted' });
}));

// Review RESTful enpoints
router.get('/:id/reviews', asyncHandler(async (req, res) => {
    const reviews = await Review.findAll({
        where: {
            spotId: req.params.id
        },
        include: [User, Spot]
    });

    return res.json({
        reviews
    });
}));

router.post('/:id/reviews', asyncHandler(async (req, res) => {
    const { spotId, userId, review, rating } = req.body;

    const createReview = await Review.create({ spotId, userId, review, rating });

    const newReview = await Review.findByPk(createReview.id, { include: [User, Spot] });

    return res.json({ newReview });
}));

module.exports = router;
