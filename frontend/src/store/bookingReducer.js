import { csrfFetch } from './csrf';

// CREATE
const ADD_BOOKING = 'Bookings/addBooking';

// READ
const GET_BOOKINGS = 'Bookings/getBooking';

// DELETE
const DELETE_BOOKING = 'Bookings/deleteBooking';


// Thunk action creators
const actionAddBooking = (booking) => {
    return {
        type: ADD_BOOKING,
        booking
    }
}

const actionGetBookings = (bookings) => {
    return {
        type: GET_BOOKINGS,
        bookings
    }
}

const actionDeleteBooking = (bookingId) => {
    return {
        type: DELETE_BOOKING,
        bookingId
    }
}


// Thunk
export const createBooking = (payload) => async (dispatch) => {
    const response = await csrfFetch(`/api/bookings/new`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(actionAddBooking(data));
        return data;
    }
}

export const getBookings = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/bookings/${spotId}`);

    if (response.ok) {
        const data = await response.json();
        dispatch(actionGetBookings(data.bookings));
        return data.bookings;
    }
}

export const getHostedBookings = (userId) => async (dispatch) => {
    const response = await csrfFetch(`/api/bookings/hosting/${userId}`);

    if (response.ok) {
        const data = await response.json();
        dispatch(actionGetBookings(data.bookings));
        return data.bookings;
    }
}

export const getUserBookings = (userId) => async (dispatch) => {
    const response = await csrfFetch(`/api/bookings/trips/${userId}`);

    if (response.ok) {
        const data = await response.json();
        dispatch(actionGetBookings(data.bookings));
        return data.bookings;
    }
}

export const updateBooking = (payload) => async (dispatch) => {
    const response = await csrfFetch(`/api/bookings/${payload.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });


    if (response.ok) {
        const data = await response.json();
        dispatch(actionAddBooking(data.booking));
        return data;
    }
}

export const deleteBooking = (bookingId) => async (dispatch) => {
    const response = await csrfFetch(`/api/bookings/${bookingId}`, {
        method: 'DELETE'
    });

    const data = await response.json();

    if (data.message === 'Successfully Deleted') {
        dispatch(actionDeleteBooking(bookingId));
        return data;
    }
}

const initialState = {};

// Reducer
const bookingReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_BOOKINGS: {
            const newState = {};
            action.bookings.forEach( booking => {
                newState[booking.id] = booking;
            });
            return newState;
        }
        case ADD_BOOKING: {
            const newState = { ...state };
            newState[action.booking.id] = action.booking;
            return newState;
        }
        case DELETE_BOOKING: {
            const newState = { ...state };
            delete newState[action.bookingId];
            return newState;
        }
        default:
            return state;
    }
};

export default bookingReducer;
