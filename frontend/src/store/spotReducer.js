import { csrfFetch } from './csrf';

// CREATE/UPDATE
const ADD_SPOT = 'spots/addSpot';
const ADD_IMAGES = 'spots/addImage';

// READ
const GET_SPOTS = 'spots/getSpot';
const GET_SINGLE_SPOT = 'spots/getSingleSpot';

// DELETE
const DELETE_SPOT = 'spots/deleteSpot';
const DELETE_IMAGE = 'spots/deleteImage';


// Thunk action creators
const actionAddSpot = (spot) => {
    return {
        type: ADD_SPOT,
        spot
    }
};

const actionAddImages = (images) => {
    return {
        type: ADD_IMAGES,
        images
    }
};

const actionGetSpots = (spots, images) => {
    return {
        type: GET_SPOTS,
        spots,
        images
    }
};

const actionGetSingleSpot = (spot, images) => {
    return {
        type: GET_SINGLE_SPOT,
        spot,
        images
    }
};

const actionDeleteSpot = (spotId, imageIds) => {
    return {
        type: DELETE_SPOT,
        spotId,
        imageIds
    }
};

const actionDeleteImage = (imageId) => {
    return {
        type: DELETE_IMAGE,
        imageId
    }
};


// Thunks
export const getSpots = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots');

    if (response.ok) {
        const data = await response.json();
        dispatch(actionGetSpots(data.spots, data.images));
        return data;
    }
};

export const getSingleSpot = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/single-spot/${spotId}`);

    if (response.ok) {
        const data = await response.json();
        dispatch(actionGetSingleSpot(data.spot, data.images));
        return data;
    }
};

export const getSpotImages = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/images`);

    if (response.ok) {
        const data = await response.json();
        dispatch(actionAddImages(data.images));
        return data.images;
    }
};

export const createSpot = (payload) => async (dispatch) => {
    const { userId, address, city, state, country, name, description, price, images } = payload;
    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('address', address);
    formData.append('city', city);
    formData.append('state', state);
    formData.append('country', country);
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('images', images[0])
    formData.append('images', images[1])
    formData.append('images', images[2])
    formData.append('images', images[3])
    formData.append('images', images[4])

    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: { 'Content-Type': 'multipart/form-data' },
        body: formData
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(actionAddSpot(data.spot));
        dispatch(actionAddImages(data.spotImages));
        return data.spot.id;
    }
}

export const createImages = (payload) => async (dispatch) => {
    const { id, images } = payload;
    const formData = new FormData();

    if (images && images.length !== 0) {
        for (var i = 0; i < images.length; i++) {
          formData.append("images", images[i]);
        }
      }

    const response = await csrfFetch(`/api/spots/${id}/images/new`, {
        method: 'POST',
        headers: { 'Content-Type': 'multipart/form-data' },
        body: formData
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(actionAddImages(data.spotImages));
        return data.spotImages;
    }
}

export const updateSpot = (payload) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${payload.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });


    if (response.ok) {
        const data = await response.json();
        dispatch(actionAddSpot(data.spot));
        return data;
    }
}

export const deleteSpot = (payload) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${payload.spotId}`, {
        method: 'DELETE'
    });

    const data = await response.json();

    if (data.message === 'Successfully Deleted') {
        dispatch(actionDeleteSpot(payload.spotId, payload.imageIds));
        return data;
    }
}

export const deleteImage = (payload) => async (dispatch) => {
    const { spotId, imageId } = payload;

    const response = await csrfFetch(`/api/spots/${spotId}/images/${imageId}/delete`, {
        method: 'DELETE'
    });

    const data = await response.json();

    if (data.message === 'Successfully Deleted') {
        dispatch(actionDeleteImage(imageId));
        return data;
    } else {
        return data
    }
}

const initialState = { spots: {}, images: {} };

// Reducer
const spotReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_SPOTS: {
            const newState = { spots: {}, images: {} };
            action.spots.forEach( spot => {
                newState.spots[spot.id] = spot;
            });
            action.images.forEach( image => {
                newState.images[image.id] = image;
            });
            return newState;
        }
        case GET_SINGLE_SPOT: {
            const newState = {spots: {}, images: {}};

            newState.spots[action.spot.id] = action.spot;

            action.images.forEach(image => {
                newState.images[image.id] = image;
            });
            return newState;
        }
        case ADD_SPOT: {
            const newState = { ...state };
            newState.spots[action.spot.id] = action.spot;
            return newState;
        }
        case ADD_IMAGES: {
            const newState = { ...state };
            action.images.forEach( image => {
                newState.images[image.id] = image;
            })
            return newState;
        }
        case DELETE_SPOT: {
            const newState = { ...state };
            delete newState.spots[action.spotId];

            // action.imageIds.forEach( imageId => {
            //     delete newState.images[imageId];
            // });
            return newState;
        }
        case DELETE_IMAGE: {
            const newState = { ...state }
            delete newState.images[action.imageId];

            return newState;
        }
        default:
            return state;
    }
}

export default spotReducer;
