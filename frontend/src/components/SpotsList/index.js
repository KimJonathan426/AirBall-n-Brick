import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getSpots } from '../../store/spotReducer';

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
        <div>
            <h1>Spots</h1>
            <div>
                {spotArray.map((spot) => {
                    spotImg = imageArray.find(image => spot?.id === image?.spotId)
                    return (
                        <div key={spot?.id}>
                            <NavLink to={`/spots/${spot?.id}`}>
                                <img src={spotImg?.url} />
                                <div>
                                    {spot?.name}
                                    {spot?.city}
                                    {spot?.state}
                                    {spot?.price}
                                </div>
                            </NavLink>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default SpotList;
