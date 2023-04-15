const qs = require('qs');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const { jwtConfig, googleClientId, googleClientSecret, googleOauthRedirectUrl } = require('../config');
const { User } = require('../db/models');
const { Op } = require('sequelize');
const { secret, expiresIn } = jwtConfig;


// Sends a JWT Cookie
const setTokenCookie = (res, user) => {
    // Create the token.
    const token = jwt.sign(
        { data: user.toSafeObject() },
        secret,
        { expiresIn: parseInt(expiresIn) } // 604,800 seconds = 1 week
    );

    const isProduction = process.env.NODE_ENV === "production";

    // Set the token cookie
    res.cookie('token', token, {
        maxAge: expiresIn * 1000, // maxAge in milliseconds
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction && "Lax"
    });

    return token;
};

const restoreUser = (req, res, next) => {
    // token parsed from cookies
    const { token } = req.cookies;

    return jwt.verify(token, secret, null, async (err, jwtPayload) => {
        if (err) {
            return next();
        }

        try {
            const { id } = jwtPayload.data;
            req.user = await User.scope('currentUser').findByPk(id);
        } catch (e) {
            res.clearCookie('token');
            return next();
        }

        if (!req.user) res.clearCookie('token');

        return next();
    });
};

// If there is no current user, return an error
const requireAuth = [
    restoreUser,
    function (req, _res, next) {
        if (req.user) return next();

        const err = new Error('Unauthorized');
        err.title = 'Unauthorized';
        err.errors = ['Unauthorized'];
        err.status = 401;
        return next(err);
    }
];

const getGoogleOAuthTokens = async ({ code }) => {
    const url = 'https://oauth2.googleapis.com/token'

    const values = {
        code,
        client_id: googleClientId,
        client_secret: googleClientSecret,
        redirect_uri: googleOauthRedirectUrl,
        grant_type: 'authorization_code',
    };

    try {
        const res = await axios.post(url, qs.stringify(values),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });
        return res.data;
    } catch (error) {
        console.error(error, 'Failed to fetch Google Oauth Tokens');
        throw new Error(error.message);
    }
}

const getGoogleUser = async ({ id_token, access_token }) => {
    try {
        const res = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`, {
            headers: {
                Authorization: `Bearer ${id_token}`
            }
        })

        return res.data
    } catch (error) {
        console.error(error, "Error fetching Google user");
        throw new Error(error.message);
    }
}

// Google OAuth Handler
const googleOauthHandler = async (req, res) => {
    // Get code response from qs
    const code = req.query.code

    try {
        // Get the Id and access token with the code from google servers
        const { id_token, access_token } = await getGoogleOAuthTokens({ code });

        // Get user with tokens
        const googleUser = await getGoogleUser({ id_token, access_token });

        // Create an instance of the user in database
        if (!googleUser || !googleUser.verified_email) {
            throw new Error('Failed to verify Google user')
        }

        const checkExistingUser = await User.findOne({
            where: {
                email: { [Op.iLike]: googleUser.email }
            }
        });

        // Check if user is already registered with or without OAuth
        if (checkExistingUser) {
            // If already registered through site, prompt password login
            if (!checkExistingUser.isOAuth) {
                return res.redirect('http://localhost:3000/oauth/google/existing/' + googleUser.email);
            }

            return res.redirect('http://localhost:3000/oauth/google/login/');
        }

        // Otherwise finish signing up
        return res.redirect('http://localhost:3000/oauth/google/signup/' + googleUser.email);

    } catch (error) {
        console.error(error, 'Failed to authorize Google user');
        return res.redirect('http://localhost:3000/oauth/error');
    }
}

module.exports = { setTokenCookie, restoreUser, requireAuth, googleOauthHandler };
