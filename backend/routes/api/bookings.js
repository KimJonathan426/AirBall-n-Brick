const express = require('express');
const asyncHandler = require('express-async-handler');

const { Booking, Spot, User, Image } = require('../../db/models');

const router = express.Router();


router.get('/:spotId', asyncHandler(async (req, res) => {
    const bookings = await Booking.findAll({
        where: {
            spotId: req.params.spotId
        },
        include: [Spot]
    });

    return res.json({
        bookings
    });
}));

router.get('/trips/:userId', asyncHandler(async (req, res) => {
    const bookings = await Booking.findAll({
        where: {
            userId: req.params.userId
        },
        include: [User, Spot]
    });

    return res.json({
        bookings
    });
}));

router.post('/new', asyncHandler(async (req, res) => {
    const { userId, spotId, startDate, endDate } = req.body;

    const image = await Image.findOne({
        where: {
            spotId: spotId
        },
        order: [
            ['id', 'ASC']
        ]
    });

    const url = image.url;

    const booking = await Booking.create({ userId, spotId, startDate, endDate, url });

    return res.json({
        booking
    });
}));

router.delete('/:id', asyncHandler(async (req, res) => {
    const booking = await Booking.findByPk(req.params.id);

    await booking.destroy();

    return res.json({ message: 'Successfully Deleted' });
}));


module.exports = router;
