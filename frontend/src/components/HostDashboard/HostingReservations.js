import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CurrentlyHosting from './Reservations/CurrentlyHosting';
import CheckingOut from './Reservations/CheckingOut';
import ArrivingSoon from './Reservations/ArrivingSoon';
import Upcoming from './Reservations/Upcoming';
import { getHostedBookings } from '../../store/bookingReducer';

const HostingReservations = () => {
    const dispatch = useDispatch();
    const bookingData = useSelector(state => state.booking)
    const userId = useSelector(state => state.session.user?.id)
    const [choice, setChoice] = useState('hosting')
    const [currentlyHosting, setCurrentlyHosting] = useState([]);
    const [checkingOut, setCheckingOut] = useState([]);
    const [arrivingSoon, setArrivingSoon] = useState([]);
    const [upcoming, setUpcoming] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(getHostedBookings(userId))

            setLoading(true);
        }

        fetchData();
    }, [dispatch, userId]);

    // console.log(bookingData)

    return (
        <div className='hosting-reservations-container'>
            <div className='hosting-reservations-main'>
                <div className='reservation-header'>
                    Your reservations
                </div>
                <div className='reservation-options'>
                    <button onClick={() => setChoice('hosting')} className={choice === 'hosting' ? 'reservation-btn-choice' : 'reservation-btn-option'}>Currently hosting ({currentlyHosting.length})</button>
                    <button onClick={() => setChoice('checkout')} className={choice === 'checkout' ? 'reservation-btn-choice' : 'reservation-btn-option'}>Checking out ({checkingOut.length})</button>
                    <button onClick={() => setChoice('arriving')} className={choice === 'arriving' ? 'reservation-btn-choice' : 'reservation-btn-option'}>Arriving Soon ({arrivingSoon.length})</button>
                    <button onClick={() => setChoice('upcoming')} className={choice === 'upcoming' ? 'reservation-btn-choice' : 'reservation-btn-option'}>Upcoming ({upcoming.length})</button>
                </div>
                <div className='reservation-display'>
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
                </div>
            </div>
        </div>
    )
}

export default HostingReservations;
