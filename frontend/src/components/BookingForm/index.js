import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRange } from 'react-date-range';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import './BookingForm.css';
import { getBookings } from '../../store/bookingReducer';
import Loading from '../Loading';

const BookingForm = ({ spotId }) => {
    const dispatch = useDispatch();

    const [disabledDates, setDisabledDates] = useState([]);
    const [loading, setLoading] = useState(false);

    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);

    useEffect(() => {
        const fetchData = async () => {
            const spotBookings = await dispatch(getBookings(spotId))

            if (spotBookings) {

                const dates = [];

                for (let booking of Object.values(spotBookings)) {
                    console.log('yes')
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
                <form>


                </form>
            </>
            :
            <Loading />
    )
}

export default BookingForm;
