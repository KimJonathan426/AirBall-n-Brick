const express = require('express');
const asyncHandler = require('express-async-handler');

const { Review } = require('../../db/models');

const router = express.Router();

router.delete('/:id', asyncHandler(async (req, res) => {
    const review = await Review.findByPk(req.params.id);

    await review.destroy();

    return res.json({ message: 'Successfully Deleted' });
}));

module.exports = router;
