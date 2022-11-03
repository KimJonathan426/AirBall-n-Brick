import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUserBookings } from '../../store/bookingReducer';
import Loading from '../Loading';
import wavingHand from '../../images/hand-image.svg';
import './Trips.css';

const Trips = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user?.id);

    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(false);
    const [activeTrips, setActiveTrips] = useState([]);
    const [pastTrips, setPastTrips] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            if (!sessionUser) {
                return
            }

            const trips = await dispatch(getUserBookings(sessionUser))

            if (trips) {
                const currentDate = new Date();
                const active = [];
                const past = [];


                for (let trip of trips) {
                    const endDate = new Date(trip.endDate);
                    endDate.setTime(endDate.getTime() + 23.9999 * 60 * 60 * 1000);

                    if (currentDate > endDate) past.push(trip);
                    else active.push(trip);
                }

                setActiveTrips(active);
                setPastTrips(past);
            }

            setUser(true);
            setLoading(true);
        }

        fetchData();
    }, [dispatch, sessionUser])


    return (
        loading ? user ?
            <div className='trips-container'>
                <div className='trips-content'>
                    <h1 className='trips-header'>Trips</h1>
                    <div className='booked-trips-container'>
                        <div className='booked-trips'>
                            <div className='no-booked-trips'>
                                <div className='waving-hand-box'>
                                    <img className='waving-hand' src={wavingHand} />
                                </div>
                                <div className='no-booked-trips-info-1'>
                                    <span>
                                        No trips booked...yet!
                                    </span>
                                </div>
                                <div className='no-booked-trips-info-2'>
                                    <span>
                                        Time to dust off your shoes and start planning your next game
                                    </span>
                                </div>
                                <div className='start-searching-box'>
                                    <Link to='/' className='start-searching-link'>
                                        <span>Start searching</span>
                                    </Link>
                                </div>
                            </div>
                            <div className='no-booked-trips-image-box'>
                                <div className='trips-picture-box'>
                                    <picture>
                                        <source srcSet="https://airballnbrick.s3.amazonaws.com/trips-airbnb-background-320.webp 1x" media="(max-width: 743px)"/>
                                        <source srcSet="https://airballnbrick.s3.amazonaws.com/trips-airbnb-background-320.webp 1x" media="(min-width: 743.1px) and (max-width: 1127px)"/>
                                        <source srcSet="https://airballnbrick.s3.amazonaws.com/trips-airbnb-background-720.webp 1x" media="(min-width: 1127.1px) and (max-width: 1439px)"/>
                                        <source srcSet="https://airballnbrick.s3.amazonaws.com/trips-airbnb-background-1200.webp 1x" media="(min-width: 1439.1px)"/>
                                        <img className='main-picture' src="https://airballnbrick.s3.amazonaws.com/trips-airbnb-background-720.webp"/>
                                    </picture>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        Where you've been
                    </div>
                </div>
            </div>
            :
            <div className='trips-container'>Prompt Login Screen Here</div>
            :
            <Loading />
    )
}

export default Trips;
