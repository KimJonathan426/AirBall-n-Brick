const express = require('express');
const asyncHandler = require('express-async-handler');

const { Review } = require('../../db/models');

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    const reviews = await Review.findAll();

    const avgRatings = {};
    reviews.forEach( review => {
        if (avgRatings[review.spotId]) {
            avgRatings[review.spotId].ratings += review.rating;
            avgRatings[review.spotId].count++;
        } else {

            avgRatings[review.spotId] = {'id': review.spotId, 'ratings': review.rating, 'count': 1};
        }
    });

    const avgRatingArray = Object.values(avgRatings);

    avgRatingArray.forEach( spot => {
        let avg = spot.ratings / spot.count;
        let rounded = Math.round(avg * 10) / 10;
        let standardizedAvg = rounded.toFixed(1);
        delete spot['ratings']
        spot['avgRate'] = standardizedAvg;
    })

    return res.json({ avgRatingArray });
}));

router.delete('/:id', asyncHandler(async (req, res) => {
    const review = await Review.findByPk(req.params.id);

    await review.destroy();

    return res.json({ message: 'Successfully Deleted' });
}));

module.exports = router;
