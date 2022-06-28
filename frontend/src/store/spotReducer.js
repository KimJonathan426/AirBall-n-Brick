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

const actionGetSpots = (spots) => {
    return {
        type: GET_SPOTS,
        spots
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
        const spots = await response.json();
        dispatch(actionGetSpots(spots));
        return spots;
    }
};

// Reducer
const spotReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_SPOTS: {
            const newState = { ...state };
            action.spots.forEach( spot => {
                newState[spot.id] = spot
            });
            return newState;
        }
        default:
            return state;
    }
}

export default spotReducer;
