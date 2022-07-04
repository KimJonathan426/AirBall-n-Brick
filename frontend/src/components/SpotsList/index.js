import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getSpots } from '../../store/spotReducer';
import { getReviewAvg } from '../../store/reviewReducer';
import ratingStar from '../../images/rating-star.png';
import './SpotsList.css';


const SpotList = () => {
    const dispatch = useDispatch();
    const spots = useSelector(state => state.spot);
    const reviews = useSelector(state => state.review)

    useEffect(() => {
        dispatch(getSpots());
        dispatch(getReviewAvg());
    }, [dispatch]);

    const spotArray = Object.values(spots.spots);
    const imageArray = Object.values(spots.images);
    const reviewAvgs = reviews.reviewAvgs;

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
                                <div className='location-info'>
                                    <div>
                                        {spot?.city}, {spot?.state}
                                    </div>
                                    {reviewAvgs[spot?.id] && (
                                        <div className='star-text'>
                                            {reviewAvgs[spot?.id]}
                                            <img className='star-image' src={ratingStar} />
                                        </div>
                                    )}
                                    {reviewAvgs && !reviewAvgs[spot?.id] && (
                                        <div className='star-text'>
                                            New
                                            <img className='star-image' src={ratingStar} />
                                        </div>
                                    )}
                                </div>
                                <div className='name-info'>
                                    {spot?.name}
                                </div>
                                <div className='price-info'>
                                    ${spot?.price.substring(0, spot?.price.length - 3)}
                                    <span> night</span>
                                </div>
                            </div>
                        </NavLink>
                    </div>
                )
            })}
        </div>
    )
}

export default SpotList;
