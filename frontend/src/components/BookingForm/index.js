import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { Modal } from '../../context/Modal';
import { DateRange } from 'react-date-range';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getBookings } from '../../store/bookingReducer';
import ConfirmBookingModal from '../ConfirmBookingModal';
import Loading from '../Loading';
import './BookingForm.css';

const BookingForm = ({ user, spotId, price }) => {
    const dispatch = useDispatch();

    const [disabled, setDisabled] = useState(true);
    const [disabledDates, setDisabledDates] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);

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

    useEffect(() => {
        if (state[0].startDate && state[0].endDate) {
            setDisabled(false);
        }
    }, [state[0].startDate, state[0].endDate])


    return (
        loading ?
            <>
                <label className='check-in-label'></label>
                <label className='check-out-label'></label>
                <div className='calendar-container'>
                    <DateRange
                        className='calendar'
                        editableDateInputs={true}
                        onChange={item => setState([item.selection])}
                        moveRangeOnFirstSelection={false}
                        ranges={state}
                        minDate={new Date()}
                        disabledDates={disabledDates}
                        dateDisplayFormat='MM/d/yyyy'
                    />
                </div>
                {user ?
                    <>
                        <button disabled={disabled} className={disabled ? 'reserve-btn reserve-disabled' : 'reserve-btn'} onClick={() => setShowModal(true)}>Reserve</button>
                        {showModal && (
                            <Modal onClose={() => setShowModal(false)}>
                                <ConfirmBookingModal userId={user} spotId={spotId} price={price} startDate={state[0].startDate} endDate={state[0].endDate} setShowModal={setShowModal}/>
                            </Modal>
                        )}
                    </>
                    :
                    <button disabled={true} className='reserve-btn reserve-disabled'>Log in to reserve</button>
                }
            </>
            :
            <Loading />
    )
}

export default BookingForm;
