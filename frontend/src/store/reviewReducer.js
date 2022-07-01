import { csrfFetch } from './csrf';

// READ
const GET_REVIEWS = 'reviews/getReview';


// Thunk action creators
const actionGetReviews = (reviews) => {
    return {
        type: GET_REVIEWS,
        reviews
    }
}


// Thunk
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
        default:
            return state;
    }
};

export default reviewReducer;
