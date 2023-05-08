const express = require('express');
const asyncHandler = require('express-async-handler');

const { Booking, Spot, User, Image } = require('../../db/models');
const { Op } = require('sequelize');

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

router.get('/hosting/:userId', asyncHandler(async (req, res) => {
    // Limit query to only dates of interest, history is not provided in host booking categories.
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0);

    const bookings = await Booking.findAll({
        where: {
            hostId: req.params.userId,
            endDate: {
                [Op.gte]: yesterday
            }
        },
        include: [User, Spot]
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
    const { userId, spotId, hostId, startDate, endDate } = req.body;

    const image = await Image.findOne({
        where: {
            spotId: spotId
        },
        order: [
            ['id', 'ASC']
        ]
    });

    const url = image.url;

    const booking = await Booking.create({ userId, spotId, hostId, startDate, endDate, url });

    return res.json({
        booking
    });
}));

router.put('/:id', asyncHandler(async (req, res) => {
    const { id, startDate, endDate } = req.body;

    const booking = await Booking.findByPk(id);

    await booking.update({ startDate, endDate });

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
