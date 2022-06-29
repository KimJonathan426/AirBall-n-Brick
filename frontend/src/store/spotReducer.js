import { csrfFetch } from './csrf';

// CREATE
const CREATE_SPOT = 'spots/createSpot';

// READ
const GET_SPOTS = 'spots/getSpot';

// UPDATE
const UPDATE_SPOT = 'spots/updateSpot';

// DELETE
const DELETE_SPOT = 'spots/deleteSpot';


// Thunk action creators
const actionCreateSpot = (spot) => {
    return {
        type: CREATE_SPOT,
        spot
    }
}

const actionGetSpots = (spots, images) => {
    return {
        type: GET_SPOTS,
        spots,
        images
    }
}

const actionUpdateSpot = (spot) => {
    return {
        type: UPDATE_SPOT,
        spot
    }
}

const actionDeleteSpot = (spotId) => {
    return {
        type: DELETE_SPOT,
        spotId
    }
}


// Thunks
export const getSpots = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots');

    if (response.ok) {
        const data = await response.json();
        dispatch(actionGetSpots(data.spots, data.images));
        return data;
    }
};

const initialState = { spots: {}, images: {}, isLoaded: true };

// Reducer
const spotReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_SPOTS: {
            const newState = { ...state };
            action.spots.forEach( spot => {
                newState.spots[spot.id] = spot
            });
            action.images.forEach( image => {
                newState.images[image.id] = image
            });
            return newState;
        }
        default:
            return state;
    }
}

export default spotReducer;
