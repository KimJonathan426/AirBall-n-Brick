import { csrfFetch } from './csrf';

// CREATE/UPDATE
const ADD_SPOT = 'spots/createSpot';
const ADD_IMAGE = 'spots/createImage';

// READ
const GET_SPOTS = 'spots/getSpot';

// DELETE
const DELETE_SPOT = 'spots/deleteSpot';


// Thunk action creators
const actionAddSpot = (spot) => {
    return {
        type: ADD_SPOT,
        spot
    }
}

const actionAddImage = (image) => {
    return {
        type: ADD_IMAGE,
        image
    }
}

const actionGetSpots = (spots, images) => {
    return {
        type: GET_SPOTS,
        spots,
        images
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

export const createSpot = (payload) => async (dispatch) => {
    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    if (response.ok) {
        const spot = await response.json();
        dispatch(actionAddSpot(spot));
        return spot;
    }

}

const initialState = { spots: {}, images: {} };

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
        case ADD_SPOT: {
            const newState = { ...state };
            newState[action.spot.id] = action.spot;
            return newState;
        }
        case ADD_IMAGE: {
            const newState = { ...state };
            newState[action.image.id] = action.image;
            return newState;
        }
        default:
            return state;
    }
}

export default spotReducer;
