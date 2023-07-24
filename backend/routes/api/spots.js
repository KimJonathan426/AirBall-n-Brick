const express = require('express');
const asyncHandler = require('express-async-handler');
const { multiplePublicFileUpload, multipleMulterUpload } = require('../../awsS3');

const { User, Spot, Image, Review, Booking, Tag, Amenity } = require('../../db/models');

const router = express.Router();

router.get('/:filter', asyncHandler(async (req, res) => {
    const filter = req.params.filter;

    let spots;

    if (filter === 'All') {
        spots = await Spot.findAll({
            include: [User]
        });
    } else {
        spots = await Spot.findAll({
            include: [
                {
                    model: Tag,
                    where: { name: filter },
                },
                { model: User },
            ],
        });
    };

    const images = [];

    for (let spot of spots) {
        const spotImages = await Image.findAll({
            where: {
                spotId: spot.id
            },
            limit: 5
        });

        images.push(...spotImages);
    };

    return res.json({
        spots,
        images
    });
}));

router.get('/single-spot/:spotId', asyncHandler(async (req, res) => {
    const spotId = req.params.spotId;

    const spot = await Spot.findByPk(spotId, {
        include: [User, Tag, Amenity]
    });

    const images = await Image.findAll({
        where: {
            spotId: spotId
        }
    });

    return res.json({
        spot,
        images
    });
}));

router.get('/user/:userId', asyncHandler(async (req, res) => {
    const userId = req.params.userId;

    const spots = await Spot.findAll({
        where: {
            userId
        },
        include: [User, Tag, Amenity]
    });

    const images = [];

    for (let spot of spots) {
        const spotImage = await Image.findOne({
            where: {
                spotId: spot.id
            }
        });

        images.push(spotImage);
    };

    return res.json({
        spots,
        images
    });
}));

router.post('/', multipleMulterUpload("images"), asyncHandler(async (req, res) => {
    const { userId, address, city, state, zipcode,
        country, lat, lng, showSpecific, name,
        description, type, price, tags, amenities } = req.body;

    const images = await multiplePublicFileUpload(req.files);

    const spot = await Spot.create({
        userId, address, city, state, zipcode,
        country, lat, lng, showSpecific, name, description, type, price
    });

    const spotId = spot.id;
    const spotImages = [];

    for (let image of images) {
        const spotImage = await Image.create({ spotId, url: image });
        spotImages.push(spotImage);
    }

    const tagsArray = JSON.parse(tags);
    const tagIds = [];
    const amenitiesArray = JSON.parse(amenities);
    const amenityIds = [];

    for (let tag of tagsArray) {
        const foundTag = await Tag.findOne({
            where: { name: tag }
        });

        if (foundTag) {
            tagIds.push(foundTag.id);
        };
    };

    for (let amenity of amenitiesArray) {
        const foundAmenity = await Amenity.findOne({
            where: { name: amenity }
        });

        if (foundAmenity) {
            amenityIds.push(foundAmenity.id);
        };
    };

    await spot.addTags(tagIds);
    await spot.addAmenities(amenityIds);

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
    });

    return res.json({
        images
    });
}));

router.delete('/:spotId/images/:imageId/delete', asyncHandler(async (req, res) => {

    const image = await Image.findByPk(req.params.imageId);
    const allImages = await Image.findAll({
        where: {
            spotId: req.params.spotId
        },
        order: [
            ['id', 'ASC']
        ]
    });

    const urlMain = allImages[0].url;
    const url = allImages[1].url;
    const destroyedUrl = image.url;

    if (allImages.length < 6) {
        return res.json({ message: 'Cannot delete, you must have a minimum of 5 images.' });
    }

    await image.destroy();

    if (destroyedUrl === urlMain) {
        const spotBookings = await Booking.findAll({
            where: {
                spotId: req.params.spotId
            }
        });

        for (let booking of spotBookings) {
            await booking.update({ url });
        };
    };

    return res.json({ message: 'Successfully Deleted' });
}));

router.put('/:id', asyncHandler(async (req, res) => {
    const { id, address, city, state, zipcode, country, lat, lng, showSpecific,
        name, type, description, price, tags, amenities } = req.body;

    try {
        const spot = await Spot.findByPk(id, {
            include: [User, Tag, Amenity]
        });

        await spot.update({
            address, city, state, zipcode, country, lat, lng,
            showSpecific, name, type, description, price
        });

        await spot.setTags([]);
        await spot.setAmenities([]);

        const tagIds = [];
        const amenityIds = [];

        for (let tag of tags) {
            const foundTag = await Tag.findOne({
                where: { name: tag }
            });

            if (foundTag) {
                tagIds.push(foundTag.id);
            };
        };

        for (let amenity of amenities) {
            const foundAmenity = await Amenity.findOne({
                where: { name: amenity }
            });

            if (foundAmenity) {
                amenityIds.push(foundAmenity.id);
            };
        };

        await spot.addTags(tagIds);
        await spot.addAmenities(amenityIds);

        return res.json({
            spot
        });

    } catch (error) {
        console.error('Error updating spot:', error);
        return res.json({ error: 'Error updating spot, please try again.' });
    };
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
