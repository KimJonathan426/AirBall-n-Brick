import { csrfFetch } from './csrf';

// CREATE
const ADD_REVIEW = 'reviews/addReview';

// READ
const GET_REVIEWS = 'reviews/getReview';

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
        case CLEAR_REVIEWS:
            const clearState = {};
            return clearState
        default:
            return state;
    }
};

export default reviewReducer;
