import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getSpots } from '../../store/spotReducer';
import { getReviewAvg } from '../../store/reviewReducer';
import HomeImages from '../HomeImages';
import ratingStar from '../../images/rating-star.svg';
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

    for (let image of imageArray) {
        if (imageDict[image.spotId]) {
            imageDict[image.spotId].push(image)
        } else {
            imageDict[image.spotId] = [image]
        }
    };


    return (
        <div className='main-content-spots-list'>
            {loading ?
                <div className='spots-list-container'>
                    {spotArray.map((spot) => (
                        <div className='spot-container' key={spot.id}>
                            <NavLink to={`/spots/${spot.id}`}>
                                <HomeImages images={imageDict[spot.id]} />
                                <div className='spot-info'>
                                    <div className='location-info'>
                                        <div className='spot-location'>
                                            {spot.city}, {spot.state}
                                        </div>
                                        {reviewAvgs[spot.id] ?
                                            <div className='star-text'>
                                                <img className='star-image' src={ratingStar} alt='rating star' />
                                                {reviewAvgs[spot.id].avg}
                                            </div>
                                            :
                                            <div className='star-text'>
                                                <img className='star-image' src={ratingStar} alt='rating star' />
                                                New
                                            </div>
                                        }
                                    </div>
                                    <div className='name-info'>
                                        {spot.name}
                                    </div>
                                    <div className='price-info'>
                                        ${Number(spot.price).toLocaleString('en-US', { maximumFractionDigits: 0 })}
                                        <span> day</span>
                                    </div>
                                </div>
                            </NavLink>
                        </div>
                    ))
                    }
                </div>
                :
                <Loading />
            }
        </div>
    )
}

export default SpotList;
