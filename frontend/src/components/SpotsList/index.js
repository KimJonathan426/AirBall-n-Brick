import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getSpots } from '../../store/spotReducer';
import { getReviewAvg } from '../../store/reviewReducer';
import HomeImages from '../HomeImages';
import ratingStar from '../../images/rating-star.png';
import Loading from '../Loading';
import './SpotsList.css';


const SpotList = () => {
    const dispatch = useDispatch();
    const spots = useSelector(state => state.spot);
    const reviews = useSelector(state => state.review)

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(getSpots());
            await dispatch(getReviewAvg());

            setLoading(true);
        }

        fetchData();
    }, [dispatch]);

    const spotArray = Object.values(spots.spots);
    const imageArray = Object.values(spots.images);
    const reviewAvgs = reviews.reviewAvgs;

    let imageDict = {};

    for (let spot of spotArray) {
        imageDict[spot.id] = imageArray.filter(image => spot.id === image.spotId);
    }


    return (
        <div className='spots-list-container'>
            {loading ? spotArray.map((spot) => (
                <div className='spot-container' key={spot.id}>
                    <NavLink to={`/spots/${spot.id}`}>
                        <HomeImages images={imageDict[spot.id]} />
                        <div className='spot-info'>
                            <div className='location-info'>
                                <div>
                                    {spot.city}, {spot.state}
                                </div>
                                {reviewAvgs[spot.id] ?
                                    <div className='star-text'>
                                        {reviewAvgs[spot.id].avg}
                                        <img className='star-image' src={ratingStar} />
                                    </div>
                                    :
                                    <div className='star-text'>
                                        New
                                        <img className='star-image' src={ratingStar} />
                                    </div>
                                }
                            </div>
                            <div className='name-info'>
                                {spot.name}
                            </div>
                            <div className='price-info'>
                                ${spot.price.substring(0, spot.price.length - 3)}
                                <span> night</span>
                            </div>
                        </div>
                    </NavLink>
                </div>
            ))
                :
                <Loading />
            }
        </div>
    )
}

export default SpotList;
