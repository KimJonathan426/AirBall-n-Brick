import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getSpots, deleteSpot } from '../../store/spotReducer';
import SpotEditForm from '../SpotEditForm';
import ReviewForm from '../ReviewForm';
import SpotReviewList from '../SpotReviewList';

const SingleSpot = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const singleSpot = useSelector(state => state.spot.spots[id]);
    const images = useSelector(state => state.spot.images);
    const user = useSelector(state => state.session?.user?.id);

    const [showEditSpotForm, setShowEditSpotForm] = useState(false);

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
                        <button onClick={() => setShowEditSpotForm(true)}>Edit Court</button>
                        <button onClick={onDelete}>Delete Court</button>
                    </>
                )}
                {showEditSpotForm && (
                    <SpotEditForm spotImages={spotImages} spot={singleSpot} id={id} hideForm={() => setShowEditSpotForm(false)} />
                )}
                <div>
                    {singleSpot?.name}
                    {singleSpot?.city}
                    {singleSpot?.state}
                </div>
                <div>
                    Insert First 5 Photos and specific styling based on id and display other photos on a modal.
                    <br />
                    If there are no photos, a button will appear where photos should be prompting user to upload at least 5 photos.
                    <img src={spotImages[0]?.url} className='left-image' />
                    <img src={spotImages[1]?.url} className='middle-image' />
                    <img src={spotImages[2]?.url} className='middle-image' />
                    <img src={spotImages[3]?.url} className='right-top-image' />
                    <img src={spotImages[4]?.url} className='right-bot-image' />
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
                    <ReviewForm spotId={id}/>
                    <SpotReviewList spotId={id}/>
                </div>
            </>
        )
    }

    return (
        <div>
            {content}
        </div>
    )
}

export default SingleSpot
