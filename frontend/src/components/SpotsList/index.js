import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSpots } from '../../store/spotReducer';

const SpotList = () => {
    const dispatch = useDispatch();
    const spots = useSelector(state => state.spot);
    console.log('spots', spots)

    useEffect(() => {
        dispatch(getSpots());
    }, [dispatch]);

    const spotArray = Object.values(spots.spots);
    const imageArray = Object.values(spots.images)
    console.log('imageArray', imageArray)
    console.log('spotarray', spotArray)

    let spotImg;

    return (
        <div>
            <h1>Spots</h1>
            <div>
                {spotArray.map((spot) => {
                    spotImg = imageArray.find(image => spot.id === image.spotId)
                    return (
                        <div key={spot.id}>
                            <img src={spotImg.url}></img>
                            <div>
                                {spot.price}
                                {spot.name}
                                {spot.address}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default SpotList;
