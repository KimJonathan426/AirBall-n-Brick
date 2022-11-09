import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getSingleSpot } from '../../store/spotReducer';
import { getBookings } from '../../store/bookingReducer';
import { getReviewAvg } from '../../store/reviewReducer';
import SpotEditForm from '../SpotEditForm';
import ConfirmDeleteSpotModal from '../ConfirmDeleteSpotModal';
import ReviewForm from '../ReviewForm';
import SpotReviewList from '../SpotReviewList';
import ratingStar from '../../images/rating-star.svg';
import SpotImagesModal from '../SpotImagesModal';
import SpotImagesForm from '../SpotImagesForm';
import BookingForm from '../BookingForm';
import Loading from '../Loading';
import './SingleSpot.css';

const SingleSpot = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const spotState = useSelector(state => state.spot.spots);
    const images = useSelector(state => state.spot.images);
    const reviewAvgs = useSelector(state => state.review);
    const bookingState = useSelector(state => state.booking);
    const user = useSelector(state => state.session?.user?.id);

    const [showEditSpotForm, setShowEditSpotForm] = useState(false);
    const [showImagesForm, setShowImagesForm] = useState(false);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [loading, setLoading] = useState(false);

    const spotImages = Object.values(images);
    const singleSpot = spotState[id];
    const spotAvg = reviewAvgs.reviewAvgs;

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(getSingleSpot(id));
            await dispatch(getReviewAvg());
            await dispatch(getBookings(id))

            setRefresh(false);
            setLoading(true);
        }

        fetchData();
    }, [dispatch, id, refresh])


    return (
        <div className='single-spot-container'>
            <div className='single-spot-content'>
                {loading ? singleSpot ?
                    <>
                        {(!showEditSpotForm && !showImagesForm && user === singleSpot?.userId) && (
                            <div className='edit-delete-buttons'>
                                <button className='edit-button' onClick={() => setShowEditSpotForm(true)}>Edit Court</button>
                                <button className='edit-button' onClick={() => setShowImagesForm(true)}>Add Images</button>
                                <ConfirmDeleteSpotModal spotId={singleSpot?.id} />
                            </div>
                        )}
                        {(showEditSpotForm && user) && (
                            <SpotEditForm spot={singleSpot} id={id} hideForm={() => setShowEditSpotForm(false)} />
                        )}
                        {(showImagesForm && user) && (
                            <SpotImagesForm id={id} hideForm={() => setShowImagesForm(false)} />
                        )}
                        <div className='spot-header'>
                            <div className='single-name-info'>
                                {singleSpot.name}
                            </div>
                            <div className='spot-sub-header'>
                                <div className='spot-review-avg'>
                                    <img className='star-image' src={ratingStar} />
                                    {!spotAvg[singleSpot.id]?.avg ?
                                        <>
                                            {' New '}
                                        </>
                                        :
                                        <>
                                            {' ' + spotAvg[singleSpot.id]?.avg}
                                        </>
                                    }
                                </div>
                                <div className='spot-review-count'>
                                    {!spotAvg[singleSpot.id]?.avg ?
                                        <>
                                            <span className='divider'>&nbsp;·</span>  {' 0 reviews'}
                                        </>
                                        : spotAvg[singleSpot.id]?.avg && spotAvg[singleSpot.id]?.count === 1 ?
                                            <>
                                                <span className='divider'>&nbsp;·</span> 1 review
                                            </>
                                            :
                                            <>
                                                <span className='divider'>&nbsp;·</span> {spotAvg[singleSpot.id]?.count} reviews
                                            </>
                                    }
                                </div>
                                <div className='single-location-info'>
                                    <span className='divider'>·</span> {singleSpot?.city}, {singleSpot?.state}, {singleSpot?.country}
                                </div>
                            </div>
                        </div>
                        <div className='single-spot-image-container'>
                            <div className='main-image'>
                                <img src={spotImages[0]?.url} className='image-fit-main' />
                            </div>
                            <div className='middle-image-top'>
                                <img src={spotImages[1]?.url} className='image-fit-sub' />
                            </div>
                            <div className='middle-image-bottom'>
                                <img src={spotImages[2]?.url} className='image-fit-sub' />
                            </div>
                            <div className='right-image-top'>
                                <img src={spotImages[3]?.url} className='image-fit-sub right-top' />
                            </div>
                            <div className='right-image-bottom'>
                                <img src={spotImages[4]?.url} className='image-fit-sub right-bot' />
                            </div>
                            <div className='show-all-photos'>
                                <SpotImagesModal refresh={refresh} setRefresh={setRefresh} user={user} spot={singleSpot} />
                            </div>
                        </div>
                        <div className='single-spot-info'>
                            <div className='main-spot-content'>
                                <h3 className='host-name'>
                                    Hosted By {singleSpot.User.username}
                                </h3>
                                <h5 className='spot-description'>
                                    {singleSpot.description}
                                </h5>
                                {/* <div>
                                You have an active booking scheduled at this spot...
                            </div> */}
                            </div>
                            <div className='hovering-content'>
                                <div className='hovering-content-title'>
                                    ${Number(singleSpot.price)?.toLocaleString('en-US', { maximumFractionDigits: 0 })} <span>night</span>
                                </div>
                                <BookingForm user={user} spotId={singleSpot?.id} price={singleSpot.price} />
                            </div>
                        </div>
                        <div className='spot-review-container'>
                            <h3 className='spot-review-header'>
                                <img className='review-star-image' src={ratingStar} />
                                {spotAvg[singleSpot.id]?.avg && (
                                    <>
                                        {' ' + spotAvg[singleSpot.id]?.avg} <span>&nbsp;·&nbsp;</span> {spotAvg[singleSpot.id]?.count} reviews
                                    </>
                                )}
                                {!spotAvg[singleSpot.id]?.avg && (
                                    <>
                                        {' New'} <span>&nbsp;·&nbsp;</span> {'0 reviews'}
                                    </>
                                )}
                            </h3>
                            {(!showReviewForm && user) && (
                                <div className='post-review-button-container'>
                                    <button className='post-review-button' onClick={() => setShowReviewForm(true)}>Post a review</button>
                                </div>
                            )}
                            {(showReviewForm && user) && (
                                <ReviewForm spotId={id} hideForm={() => setShowReviewForm(false)} />
                            )}
                            <SpotReviewList user={user} spotId={id} ratingStar={ratingStar} />
                        </div>
                    </>
                    :
                    <div>Spot doesn't exist, please return <Link to='/'>Home</Link></div>
                    :
                    <Loading />
                }
            </div>
        </div>
    )
}

export default SingleSpot
