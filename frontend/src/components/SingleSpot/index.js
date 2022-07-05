import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getSpots, deleteSpot } from '../../store/spotReducer';
import { getReviewAvg } from '../../store/reviewReducer';
import SpotEditForm from '../SpotEditForm';
import ReviewForm from '../ReviewForm';
import SpotReviewList from '../SpotReviewList';
import ratingStar from '../../images/rating-star.png';
import './SingleSpot.css';

const SingleSpot = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const singleSpot = useSelector(state => state.spot.spots[id]);
    const images = useSelector(state => state.spot.images);
    const reviewAvgs = useSelector(state => state.review)
    const user = useSelector(state => state.session?.user?.id);

    const [showEditSpotForm, setShowEditSpotForm] = useState(false);
    const [showReviewForm, setShowReviewForm] = useState(false);

    const imagesArray = Object.values(images);
    const spotAvg = reviewAvgs.reviewAvgs;

    const spotImages = imagesArray.filter(image => image.spotId === +id);

    const onDelete = async (e) => {
        e.preventDefault();

        const payload = {
            spotId: singleSpot.id,
            imageIds: [
                spotImages[0],
                spotImages[1],
                spotImages[2],
                spotImages[3],
                spotImages[4],
            ]
        }

        const res = await dispatch(deleteSpot(payload));

        if (res) {
            history.push('/');
        }
    }

    useEffect(() => {
        dispatch(getSpots());
        dispatch(getReviewAvg());
    }, [dispatch])

    let content = null;

    if (!singleSpot) {
        content = (
            <div>
                This page is loading...
                <br />
                If the page does not load within 5 seconds, this court has yet to be made, go back!
            </div>
        )
    } else {
        content = (
            <>
                {(!showEditSpotForm && user === singleSpot?.userId) && (
                    <div className='edit-delete-buttons'>
                        <button className='edit-button' onClick={() => setShowEditSpotForm(true)}>Edit Court</button>
                        <button className='delete-button' onClick={onDelete}>Delete Court</button>
                    </div>
                )}
                {(showEditSpotForm && user) && (
                    <SpotEditForm spotImages={spotImages} spot={singleSpot} id={id} hideForm={() => setShowEditSpotForm(false)} />
                )}
                <div className='spot-header'>
                    <div className='single-name-info'>
                        {singleSpot?.name}
                    </div>
                    <div className='spot-sub-header'>
                        <div>
                            <img className='star-image' src={ratingStar} />
                            {spotAvg[singleSpot?.id]?.avg && (
                                <>
                                    {' ' + spotAvg[singleSpot?.id]?.avg} | {spotAvg[singleSpot?.id]?.count} reviews
                                </>
                            )}
                            {!spotAvg[singleSpot?.id]?.avg && (
                                <>
                                    {' New | 0 reviews'}
                                </>
                            )}
                        </div>
                        <div className='single-location-info'>
                            {'| ' + singleSpot?.city}, {singleSpot?.state}, {singleSpot?.country}
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
                </div>
                <div className='single-spot-info'>
                    <div className='main-spot-content'>
                        <h3 className='host-name'>
                            Hosted By {singleSpot?.User?.username}
                        </h3>
                        <h5 className='spot-description'>
                            {singleSpot?.description}
                        </h5>
                    </div>
                    <div className='hovering-content'>
                        <h5>
                            Price Per Night
                        </h5>
                        <h6>
                            ${singleSpot?.price}
                        </h6>
                    </div>
                </div>
                <div className='spot-review-container'>
                    <h3>
                        <img className='review-star-image' src={ratingStar} />
                        {spotAvg[singleSpot?.id]?.avg && (
                            <>
                                {' ' + spotAvg[singleSpot?.id]?.avg} | {spotAvg[singleSpot?.id]?.count} reviews
                            </>
                        )}
                        {!spotAvg[singleSpot?.id]?.avg && (
                            <>
                                {' New | 0 reviews'}
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
        )
    }

    return (
        <div className='single-spot-container'>
            {content}
        </div>
    )
}

export default SingleSpot
