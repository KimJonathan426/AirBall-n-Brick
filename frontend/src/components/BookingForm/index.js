import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRange } from 'react-date-range';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getBookings, createBooking } from '../../store/bookingReducer';
import Loading from '../Loading';
import './BookingForm.css';

const BookingForm = ({ user, spotId }) => {
    const dispatch = useDispatch();

    const [disabledDates, setDisabledDates] = useState([]);
    const [loading, setLoading] = useState(false);

    const [state, setState] = useState([
        {
            startDate: null,
            endDate: null,
            key: 'selection'
        }
    ]);

    useEffect(() => {
        const fetchData = async () => {
            const spotBookings = await dispatch(getBookings(spotId))

            if (spotBookings) {

                const dates = [];

                for (let booking of Object.values(spotBookings)) {
                    const startDate = new Date(booking.startDate);
                    const endDate = new Date(booking.endDate);

                    const date = new Date(startDate.getTime());

                    while (date <= endDate) {
                        dates.push(new Date(date));
                        date.setDate(date.getDate() + 1);
                    }

                }
                setDisabledDates(dates);
            }

            setLoading(true);
        }

        fetchData();
    }, [dispatch])

    const submitBooking = async (e) => {
        console.log(state[0].startDate)
        console.log(state[0].endDate)
        const payload = {
            userId: user,
            spotId,
            startDate: state.startDate,
            endDate: state.endDate
        };

        const res = await dispatch(createBooking(payload));

        if (res) {
            console.log('worked');
        }
    }


    return (
        loading ?
            <>
                <DateRange
                    className='calendar'
                    editableDateInputs={true}
                    onChange={item => setState([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={state}
                    minDate={new Date()}
                    disabledDates={disabledDates}
                />
                {user ?
                    <button className='reserve-btn' onClick={submitBooking}>Reserve</button>
                    :
                    <button  disabled={true} className='reserve-btn reserve-disabled'>Log in to reserve</button>
                }
            </>
            :
            <Loading />
    )
}

export default BookingForm;
