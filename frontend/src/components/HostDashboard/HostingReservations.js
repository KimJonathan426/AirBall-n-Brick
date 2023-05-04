import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserSpots } from '../../store/spotReducer';

const HostingReservations = () => {
    const dispatch = useDispatch();
    const spots = useSelector(state => state.spot)
    const user = useSelector(state => state.session.user)
    const [checkingOut, setCheckingOut] = useState([]);
    const [currentlyHosting, setCurrentlyHosting] = useState([]);
    const [arrivingSoon, setArrivingSoon] = useState([]);
    const [upcoming, setUpcoming] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(getUserSpots(user.id));

            setLoading(true);
        }

        fetchData();
    }, [dispatch]);


    return (
        <div className='hosting-reservations-container'>
            <div className='hosting-reservations-main'>
                <div className='reservation-header'>
                    Your reservations
                </div>
            </div>
        </div>
    )
}

export default HostingReservations;
