import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getSpots, deleteSpot } from '../../store/spotReducer';
import SpotEditForm from '../SpotEditForm';
import ReviewForm from '../ReviewForm';
import SpotReviewList from '../SpotReviewList';
import './SingleSpot.css';

const SingleSpot = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const singleSpot = useSelector(state => state.spot.spots[id]);
    const images = useSelector(state => state.spot.images);
    const user = useSelector(state => state.session?.user?.id);

    const [showEditSpotForm, setShowEditSpotForm] = useState(false);
    const [showReviewForm, setShowReviewForm] = useState(false);

    const imagesArray = Object.values(images);

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
                    <>
                        <button className='edit-button' onClick={() => setShowEditSpotForm(true)}>Edit Court</button>
                        <button className='delete-button' onClick={onDelete}>Delete Court</button>
                    </>
                )}
                {(showEditSpotForm && user) && (
                    <SpotEditForm spotImages={spotImages} spot={singleSpot} id={id} hideForm={() => setShowEditSpotForm(false)} />
                )}
                <div>
                    {singleSpot?.name}
                    {singleSpot?.city}
                    {singleSpot?.state}
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
                <div>
                    Hosted By {singleSpot?.User?.username}
                    <br />
                    {singleSpot?.price}
                    <br />
                    {singleSpot?.description}
                </div>
                <div>
                    Reviews go here
                    Review Create button
                    {(!showReviewForm && user) && (
                        <button onClick={() => setShowReviewForm(true)}>Post a review</button>
                    )}
                    {(showReviewForm && user) && (
                        <ReviewForm spotId={id} hideForm={() => setShowReviewForm(false)} />
                    )}
                    <SpotReviewList user={user} spotId={id} />
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
