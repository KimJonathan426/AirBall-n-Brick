import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getSpots } from '../../store/spotReducer';
import { getReviewAvg } from '../../store/reviewReducer';
import SpotFilterTag from './SpotFilterTag';
import HomeImages from '../HomeImages';
import ratingStar from '../../images/rating-star.svg';
import Loading from '../Loading';
import tipOff from '../../images/basketball-tip-off.png';
import './SpotsList.css';


const SpotList = () => {
    const dispatch = useDispatch();
    const spots = useSelector(state => state.spot);
    const reviews = useSelector(state => state.review);

    const [filter, setFilter] = useState('All');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(false);

        const fetchData = async () => {
            await dispatch(getSpots(filter));
            await dispatch(getReviewAvg());

            setLoading(true);
        }

        fetchData();
    }, [dispatch, filter]);

    const spotArray = Object.values(spots.spots);
    const imageArray = Object.values(spots.images);
    const reviewAvgs = reviews.reviewAvgs;

    let imageDict = {};

    for (let image of imageArray) {
        if (imageDict[image.spotId]) {
            imageDict[image.spotId].push(image)
        } else {
            imageDict[image.spotId] = [image]
        };
    };


    return (
        <div className='main-content-spots-list'>
            <SpotFilterTag filter={filter} setFilter={setFilter} setLoading={(setLoading)} />
            {loading ?
                spotArray.length > 0 ?
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
                    <div className='spots-list-empty-container'>
                        <div className='spots-list-empty-img-box'>
                            <img className='spots-list-empty-img' src={tipOff} alt='basketball tip off' />
                        </div>
                        <div className='spots-list-empty-text'>There are no {filter === 'All' ? 'courts' : `${filter.toLowerCase()} courts`} at the moment.</div>
                        <div className='spots-list-empty-text'>Check back later, court listings could tip off at anytime!</div>
                    </div>
                :
                <Loading />
            }
        </div>
    );
};

export default SpotList;
