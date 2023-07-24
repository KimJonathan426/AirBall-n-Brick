import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getUserSpots } from '../../store/spotReducer';
import reservationIcon from '../../images/reservation-icon.svg';
import SpotEditModal from '../SpotEditModal';
import SpotDeleteModal from '../SpotDeleteModal';
import AddImagesModal from '../HostSpot/Steps/Step2Photos/AddImagesModal';
import Loading from '../Loading';

const HostListings = () => {
    const dispatch = useDispatch();
    const userData = useSelector(state => state.spot);
    const userId = useSelector(state => state.session.user?.id);

    const [images, setImages] = useState({});
    const [spots, setSpots] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingImages, setLoadingImages] = useState(false);
    const [updateState, setUpdateState] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(getUserSpots(userId));

            setLoading(true);
        }

        fetchData();
    }, [dispatch, userId, updateState]);

    useEffect(() => {
        const parseImages = () => {
            const spotArray = Object.values(userData.spots);
            const imageArray = Object.values(userData.images);

            const imageDict = {};

            for (let image of imageArray) {
                imageDict[image.spotId] = image.url;
            };

            setSpots(spotArray);
            setImages(imageDict);
            setLoadingImages(true);
        };

        parseImages();
    }, [userData.images, userData.spots]);


    return (
        <div className='hosting-listing-container'>
            <div className='hosting-listing-main'>
                <div className='listing-header'>
                    Your listings
                </div>
                {loading && loadingImages ?
                    <div className='listing-display'>
                        {spots.length > 0 ?
                            <>
                                {spots.map((spot) => (
                                    <div key={spot.id} className='hosted-spot-listing'>
                                        <SpotEditModal spot={spot} setUpdateState={setUpdateState} />
                                        <SpotDeleteModal spotId={spot.id} setUpdateState={setUpdateState} />
                                        <AddImagesModal spotId={spot.id} setUpdateState={setUpdateState} />
                                        <NavLink to={`/spots/${spot.id}`} className='hosted-spot-image-container'>
                                            <img className='hosted-spot-image' src={images[spot.id]} alt='spot court' />
                                        </NavLink>
                                        <div className='hosted-spot-name'>
                                            <span className='hosted-name-text'>
                                                {spot.name}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </>
                            :
                            <div className='listing-empty-container'>
                                <div className='listing-empty-main'>
                                    <img className='listing-empty-icon' src={reservationIcon} alt='empty page with check mark' />
                                    You currently don't have any active listings.
                                </div>
                            </div>
                        }
                    </div>
                    :
                    <Loading />
                }
            </div>
        </div>
    )
}

export default HostListings;
