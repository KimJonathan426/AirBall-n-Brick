import { csrfFetch } from './csrf';

// CREATE
const ADD_REVIEW = 'reviews/addReview';

// READ
const GET_REVIEWS = 'reviews/getReview';

// DELETE
const DELETE_REVIEW = 'reviews/deleteReview';

// CLEAR
const CLEAR_REVIEWS = 'reviews/clearReviews';


// Thunk action creators
const actionAddReview = (review) => {
    return {
        type: ADD_REVIEW,
        review
    }
}

const actionGetReviews = (reviews) => {
    return {
        type: GET_REVIEWS,
        reviews
    }
}

const actionDeleteReview = (reviewId) => {
    return {
        type: DELETE_REVIEW,
        reviewId
    }
}

export const actionClearReviews = () => {
    return {
        type: CLEAR_REVIEWS,
    }
}

// Thunk
export const createReview = (payload) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${payload.spotId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(actionAddReview(data.newReview));
        return data;
    }
}

export const getReviews = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);

    if (response.ok) {
        const data = await response.json();
        dispatch(actionGetReviews(data.reviews));
        return data;
    }
}

export const deleteReview = (reviewId) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    });

    const data = await response.json();

    if (data.message === 'Successfully Deleted') {
        dispatch(actionDeleteReview(reviewId));
        return data;
    }
}

const initialState = {};

// Reducer
const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_REVIEWS: {
            const newState = { ...state };
            action.reviews.forEach( review => {
                newState[review.id] = review;
            });
            return newState;
        }
        case ADD_REVIEW: {
            const newState = { ...state };
            newState[action.review.id] = action.review;
            return newState;
        }
        case DELETE_REVIEW: {
            const newState = { ...state };
            delete newState[action.reviewId];
            return newState;
        }
        case CLEAR_REVIEWS:
            const clearState = {};
            return clearState;
        default:
            return state;
    }
};

export default reviewReducer;
