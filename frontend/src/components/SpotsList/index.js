import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getSpots } from '../../store/spotReducer';
import './SpotsList.css';

const SpotList = () => {
    const dispatch = useDispatch();
    const spots = useSelector(state => state.spot);

    useEffect(() => {
        dispatch(getSpots());
    }, [dispatch]);

    const spotArray = Object.values(spots.spots);
    const imageArray = Object.values(spots.images)

    let spotImg;

    return (
        <div className='spots-list-container'>
            {spotArray.map((spot) => {
                spotImg = imageArray.find(image => spot?.id === image?.spotId)
                return (
                    <div className='spot-container' key={spot?.id}>
                        <NavLink to={`/spots/${spot?.id}`}>
                            <div className='spot-image'>
                                <img id='center' src={spotImg?.url} />
                            </div>
                            <div className='spot-info'>
                                <div>{spot?.city}, {spot?.state}</div>
                                <div>{spot?.price}</div>
                            </div>
                        </NavLink>
                    </div>
                )
            })}
        </div>
    )
}

export default SpotList;
