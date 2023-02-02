const express = require('express');
const asyncHandler = require('express-async-handler');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { Op } = require('sequelize');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateSignup = [
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Enter a valid email.'),
    check('username')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email.'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
];

// Sign up
router.post(
    '/',
    validateSignup,
    asyncHandler(async (req, res, next) => {
        const { email, password, username } = req.body;

        const similarUserEmail = await User.findOne({
            where: {
                email: { [Op.iLike]: email }
            }
        });

        const similarUserUsername = await User.findOne({
            where: {
                username: { [Op.iLike]: username },
            }
        });

        if (similarUserEmail) {
            const err = new Error('Signup failed');
            err.status = 401;
            err.title = 'Signup failed';
            err.errors = ['This email already exists.'];
            return next(err);
        }

        if (similarUserUsername) {
            const err = new Error('Signup failed');
            err.status = 401;
            err.title = 'Signup failed';
            err.errors = ['This username already exists'];
            return next(err);
        }

        const user = await User.signup({ email, username, password });

        await setTokenCookie(res, user);

        return res.json({
            user,
        });
    }),
);

// Find email
router.get('/:email', asyncHandler(async (req, res) => {
    const email = req.params.email;

    const existingEmail = await User.findOne({
        where: {
            email: { [Op.iLike]: email }
        }
    });

    if (existingEmail) {
        res.send(200, {'result': true})
    } else {
        res.send(200, {'result': false})
    }
}));


module.exports = router;
