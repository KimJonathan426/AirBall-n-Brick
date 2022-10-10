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




module.exports = router;
