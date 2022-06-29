import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getSpots } from '../../store/spotReducer';

const SingleSpot = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const spotState = useSelector(state => state.spot);

    const spotsArray = Object.values(spotState.spots);
    const imagesArray = Object.values(spotState.images);

    const singleSpot = spotsArray.find( spot => spot.id === +id);
    const spotImages = imagesArray.filter( image => image.spotId === +id);

    useEffect( () => {
        dispatch(getSpots())
    }, [dispatch])

    return (
        <div>
            <div>
                {singleSpot?.name}
                {singleSpot?.city}
                {singleSpot?.state}
            </div>
            <div>
                Insert First 5 Photos and specific styling based on id and display other photos on a modal.
                <br />
                If there are no photos, a button will appear where photos should be prompting user to upload at least 5 photos.
                <img src={spotImages[0]?.url} className='left-image'/>
                <img src={spotImages[1]?.url} className='middle-image'/>
                <img src={spotImages[2]?.url} className='middle-image'/>
                <img src={spotImages[3]?.url} className='right-top-image'/>
                <img src={spotImages[4]?.url} className='right-bot-image'/>
            </div>
            <div>
                Hosted By {singleSpot?.User.username}
                <br />
                {singleSpot?.price}
                <br />
                {singleSpot?.description}
            </div>
            <div>
                Reviews will go here
            </div>
        </div>
    )
}

export default SingleSpot
