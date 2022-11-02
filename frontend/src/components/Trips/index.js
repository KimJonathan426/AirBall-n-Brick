import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUserBookings } from '../../store/bookingReducer';
import Loading from '../Loading';
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
        user ? loading ?
            <div className='trips-container'>
                <h1 className='trips-header'>Trips</h1>
                <div>
                    Trips Content
                </div>
                <div>
                    Where you've been
                </div>
            </div>
            :
            <Loading />
            :
            <div className='trips-container'>Prompt Login Screen Here</div>
    )
}

export default Trips;
