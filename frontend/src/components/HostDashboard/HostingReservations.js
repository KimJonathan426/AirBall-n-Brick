import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import CurrentlyHosting from './Reservations/CurrentlyHosting';
import CheckingOut from './Reservations/CheckingOut';
import ArrivingSoon from './Reservations/ArrivingSoon';
import Upcoming from './Reservations/Upcoming';
import { getHostedBookings } from '../../store/bookingReducer';
import Loading from '../Loading';

const HostingReservations = () => {
    const dispatch = useDispatch();
    const userId = useSelector(state => state.session.user?.id);
    const [choice, setChoice] = useState('hosting');
    const [currentlyHosting, setCurrentlyHosting] = useState([]);
    const [checkingOut, setCheckingOut] = useState([]);
    const [arrivingSoon, setArrivingSoon] = useState([]);
    const [upcoming, setUpcoming] = useState([]);
    const [parsed, setParsed] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const res = await dispatch(getHostedBookings(userId));

            parseBookingData(res);
            setLoading(true);
        }

        fetchData();
    }, [dispatch, userId]);

    // Parse booking data into categories
    const parseBookingData = (bookingData) => {
        const today = moment();
        const tomorrow = today.clone().add(1, 'day');

        const active = [];
        const checking = [];
        const soon = [];
        const future = [];

        for (let reservationId in bookingData) {
            const reservation = bookingData[reservationId];
            const startDate = moment(reservation.startDate);
            const endDate = moment(reservation.endDate);
            endDate.set({
                hours: 23,
                minute: 59,
                second: 59,
                millisecond: 999
            });

            // Bookings that overlap should appear in all relevant categories.
            // Active booking between start and end dates (Current)
            if (today.isAfter(startDate) && today.isBefore(endDate)) {
                active.push(reservation);
            } else if (today.isBefore(startDate, 'day')) { // If not active, double check if coming up
                future.push(reservation);
            };

            // End date is either today or tomorrow (Checking Out)
            if (endDate.isSame(today, 'day') || endDate.isSame(tomorrow, 'day')) {
                checking.push(reservation);
            };

            // Start date is either today or tomorrow (Arriving Soon)
            if (startDate.isSame(today, 'day') || startDate.isSame(tomorrow, 'day')) {
                soon.push(reservation);
            };
        }

        setCurrentlyHosting(active);
        setCheckingOut(checking);
        setArrivingSoon(soon);
        setUpcoming(future);
        setParsed(true);
    };


    return (
        <div className='hosting-reservations-container'>
            <div className='hosting-reservations-main'>
                <div className='reservation-header'>
                    Your reservations
                </div>
                <div className='reservation-options'>
                    <button onClick={() => setChoice('hosting')} className={choice === 'hosting' ? 'reservation-btn-choice' : 'reservation-btn-option'}>Currently hosting ({loading ? currentlyHosting.length : '-'})</button>
                    <button onClick={() => setChoice('checkout')} className={choice === 'checkout' ? 'reservation-btn-choice' : 'reservation-btn-option'}>Checking out ({loading ? checkingOut.length : '-'})</button>
                    <button onClick={() => setChoice('arriving')} className={choice === 'arriving' ? 'reservation-btn-choice' : 'reservation-btn-option'}>Arriving soon ({loading ? arrivingSoon.length : '-'})</button>
                    <button onClick={() => setChoice('upcoming')} className={choice === 'upcoming' ? 'reservation-btn-choice' : 'reservation-btn-option'}>Upcoming ({loading ? upcoming.length : '-'})</button>
                </div>
                {loading && parsed ?
                    <>
                        {choice === 'hosting' &&
                            <CurrentlyHosting reservations={currentlyHosting} />
                        }
                        {choice === 'checkout' &&
                            <CheckingOut reservations={checkingOut} />
                        }
                        {choice === 'arriving' &&
                            <ArrivingSoon reservations={arrivingSoon} />
                        }
                        {choice === 'upcoming' &&
                            <Upcoming reservations={upcoming} />
                        }
                    </>
                    :
                    <Loading />
                }
            </div>
        </div>
    );
};

export default HostingReservations;
