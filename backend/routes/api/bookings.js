const express = require('express');
const asyncHandler = require('express-async-handler');

const { Booking } = require('../../db/models');

const router = express.Router();


router.get('/:spotId', asyncHandler(async (req, res) => {
    const bookings = await Booking.findAll({
        where: {
            spotId: req.params.spotId
        }
    });

    return res.json({
        bookings
    });
}));

router.post('/bookings/new', asyncHandler(async (req, res) => {
    const { userId, spotId, startDate, endDate } = req.body;

    const booking = await Booking.create({ userId, spotId, startDate, endDate })
    console.log('BOOKER', booking)
    return res.json({
        booking
    });
}));


module.exports = router;
