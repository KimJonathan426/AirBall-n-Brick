const express = require('express');
const asyncHandler = require('express-async-handler');
const { multiplePublicFileUpload, multipleMulterUpload } = require('../../awsS3');

const { User, Spot, Image, Review } = require('../../db/models');

const router = express.Router();

router.get('/', asyncHandler(async (_req, res) => {
    const spots = await Spot.findAll({
        include: [User]
    });

    images = [];

    for (let spot of spots) {
        const spotImages = await Image.findAll({
            where: {
                spotId: spot.id
            },
            limit: 5
        });

        images.push(...spotImages)
    }

    return res.json({
        spots,
        images
    });
}));

router.get('/single-spot/:spotId', asyncHandler(async (req, res) => {
    const spotId = req.params.spotId;

    const spot = await Spot.findByPk(spotId, {
        include: [User]
    });
    const images = await Image.findAll({
        where: {
            spotId: spotId
        }
    })

    return res.json({
        spot,
        images
    });
}));

router.post('/', multipleMulterUpload("images"), asyncHandler(async (req, res) => {
    const { userId, address, city, state, country, name, description, price } = req.body;
    const images = await multiplePublicFileUpload(req.files);

    const spot = await Spot.create({ userId, address, city, state, country, name, description, price });

    const spotId = spot.id;
    const spotImages = [];

    for (let image of images) {
        const spotImage = await Image.create({ spotId, url: image });
        spotImages.push(spotImage);
    }

    return res.json({
        spot,
        spotImages
    });
}));

router.post('/:id/images/new', multipleMulterUpload("images"), asyncHandler(async (req, res) => {
    const spotId = req.params.id;
    const images = await multiplePublicFileUpload(req.files);

    const spotImages = [];

    for (let image of images) {
        const spotImage = await Image.create({ spotId, url: image });
        spotImages.push(spotImage);
    }

    return res.json({
        spotImages
    });
}));

router.get('/:spotId/images', asyncHandler(async (req, res) => {
    const spotId = req.params.spotId;

    const images = await Image.findAll({
        where: {
            spotId: spotId
        }
    })

    return res.json({
        images
    });
}));

router.delete('/images/:id/delete', asyncHandler(async (req, res) => {

    // const allImages = await Image.findAll();
    const image = await Image.findByPk(req.params.id);

    // console.log('allImages', allImages)

    await image.destroy();

    return res.json({ message: 'Successfully Deleted' });
}));

router.put('/:id', asyncHandler(async (req, res) => {
    const { id, address, city, state, country, name, description, price } = req.body;

    const spot = await Spot.findByPk(id, {
        include: [User]
    });

    await spot.update({ address, city, state, country, name, description, price });

    return res.json({
        spot
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
