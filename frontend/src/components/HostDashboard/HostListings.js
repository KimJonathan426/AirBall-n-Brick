import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserSpots } from '../../store/spotReducer';
import reservationIcon from '../../images/reservation-icon.svg';

const HostListings = () => {
    const dispatch = useDispatch();
    const userData = useSelector(state => state.spot)
    const userId = useSelector(state => state.session.user?.id)
    const [images, setImages] = useState({})
    const [spots, setSpots] = useState([])
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(getUserSpots(userId));

            setLoading(true);
        }

        fetchData();
    }, [dispatch, userId]);

    useEffect(() => {
        const parseImages = () => {
            const spotArray = Object.values(userData.spots);
            const imageArray = Object.values(userData.images);

            const imageDict = {};

            for (let image of imageArray) {
                if (imageDict[image.spotId]) {
                    imageDict[image.spotId].push(image);
                } else {
                    imageDict[image.spotId] = [image];
                };
            };

            setSpots(spotArray);
            setImages(imageDict);
        };

        parseImages();
    }, [userData.images]);


    return (
        <div className='hosting-listing-container'>
            <div className='hosting-listing-main'>
                <div className='listing-header'>
                    Your listings
                </div>
                <div className='listing-display'>
                    {spots.length > 0 ?
                        <div>
                            Yes
                        </div>
                        :
                        <div className='listing-empty-container'>
                            <div className='listing-empty-main'>
                                <img className='listing-empty-icon' src={reservationIcon} alt='empty page with check mark' />
                                You currently don't have any active listings.
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default HostListings;
