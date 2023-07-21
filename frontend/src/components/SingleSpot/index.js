import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getSingleSpot } from '../../store/spotReducer';
import { getBookings } from '../../store/bookingReducer';
import { getReviewAvg } from '../../store/reviewReducer';
import findBookings from '../FindBookings';
import SpotEditForm from '../SpotEditForm';
import ConfirmDeleteSpotModal from '../ConfirmDeleteSpotModal';
import ReviewForm from '../ReviewForm';
import SpotReviewList from '../SpotReviewList';
import ratingStar from '../../images/rating-star.svg';
import SpotImagesModal from '../SpotImagesModal';
import SpotImagesForm from '../SpotImagesForm';
import SpotMap from './SpotMap/index';
import BookingForm from '../BookingForm';
import BookingFormFixed from '../BookingFormFixed';
import BookingEditFormModal from '../BookingEditFormModal';
import AirCover from '../AirCover';
import CancelBookingModal from '../CancelBookingModal';
import Loading from '../Loading';
import { ReactComponent as SelfCheck } from '../../images/self-check.svg';
import full from '../../images/types/type-full.png'
import half from '../../images/types/type-half.png'
import share from '../../images/types/type-share.png'
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
    const [previousBookings, setPreviousBookings] = useState([]);
    const [currentBookings, setCurrentBookings] = useState([]);
    const [upcomingBookings, setUpcomingBookings] = useState([]);
    const [stateTransfer, setStateTransfer] = useState([
        {
            startDate: null,
            endDate: null,
            key: 'selection'
        }
    ]);
    const [addDisabledDate, setAddDisabledDate] = useState(false);
    const [canceled, setCanceled] = useState(false);
    const [edited, setEdited] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [loading, setLoading] = useState(false);

    const spotImages = Object.values(images);
    const singleSpot = spotState[id];
    const spotAmenities = singleSpot?.Amenities;
    const spotAvg = reviewAvgs.reviewAvgs;

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(getSingleSpot(id));
            await dispatch(getReviewAvg());
            await dispatch(getBookings(id));

            setRefresh(false);
            setLoading(true);
        };

        fetchData();
    }, [dispatch, id, refresh]);

    useEffect(() => {
        if (user) {
            findBookings(Object.values(bookingState), user, setPreviousBookings, setCurrentBookings, setUpcomingBookings);
        } else {
            setPreviousBookings([]);
            setCurrentBookings([]);
            setUpcomingBookings([]);
        };
    }, [bookingState, user]);


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
                                    <img className='star-image' src={ratingStar} alt='star' />
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
                                <img src={spotImages[0]?.url} className='image-fit-main' alt='listing' />
                            </div>
                            <div className='middle-image-top'>
                                <img src={spotImages[1]?.url} className='image-fit-sub' alt='listing' />
                            </div>
                            <div className='middle-image-bottom'>
                                <img src={spotImages[2]?.url} className='image-fit-sub' alt='listing' />
                            </div>
                            <div className='right-image-top'>
                                <img src={spotImages[3]?.url} className='image-fit-sub right-top' alt='listing' />
                            </div>
                            <div className='right-image-bottom'>
                                <img src={spotImages[4]?.url} className='image-fit-sub right-bot' alt='listing' />
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
                                <div className='single-spot-type-container'>
                                    <div className='single-spot-type-item'>
                                        <SelfCheck />
                                        <div className='single-spot-type-item-text'>
                                            <div className='type-item-text-1'>Self check-in</div>
                                            <div className='type-item-text-2'>Walk onto the court and start playing</div>
                                        </div>
                                    </div>
                                    {singleSpot.type === 'full' ?
                                        <div className='single-spot-type-item'>
                                            <img src={full} style={{ width: '23px', height: '23px' }} alt='court type' />
                                            <div className='single-spot-type-item-text'>
                                                <div className='type-item-text-1'>Full court</div>
                                                <div className='type-item-text-2'>Entire court is available to you and your group</div>
                                            </div>
                                        </div>
                                        : singleSpot.type === 'half' ?
                                            <div className='single-spot-type-item'>
                                                <img src={half} style={{ width: '26px', height: '26px', transform: 'rotate(90deg)' }} alt='court type' />
                                                <div className='single-spot-type-item-text'>
                                                    <div className='type-item-text-1'>Half court</div>
                                                    <div className='type-item-text-2'>Portion of a court reserved for you and your group</div>
                                                </div>
                                            </div>
                                            :
                                            <div className='single-spot-type-item'>
                                                <img src={share} style={{ width: '26px', height: '26px' }} alt='court type' />
                                                <div className='single-spot-type-item-text'>
                                                    <div className='type-item-text-1'>Shared court</div>
                                                    <div className='type-item-text-2'>Play with and against other players</div>
                                                </div>
                                            </div>
                                    }
                                </div>
                                <h5 className='spot-description'>
                                    {singleSpot.description}
                                </h5>
                                <AirCover />
                                {spotAmenities.length > 0 &&
                                    <div className='single-spot-amenities-container'>
                                        <h2 className='single-spot-header'>
                                            What this place offers
                                        </h2>
                                        <div className='single-spot-amenities-inner'>
                                            {spotAmenities.map(amenity =>
                                                <div key={amenity.id} className='spot-amenities-item'>
                                                    <div className='spot-amenities-item-inner'>
                                                        <img src={amenity.url} style={{ marginRight: '16px' }} alt='amenity' />
                                                        <div>{amenity.name}</div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                }
                                {previousBookings.length > 0 &&
                                    <div className='previous-bookings content-divider'>
                                        <h2 className='single-spot-header'>You've played here before</h2>
                                        {previousBookings.map(booking =>
                                            <div key={booking.id} className='single-booking-prev'>
                                                <div className='booking-date'>
                                                    <div className='booking-check'>
                                                        <div>
                                                            From:
                                                        </div>
                                                        <div>
                                                            {booking.start}
                                                        </div>
                                                    </div>
                                                    <div className='booking-check'>
                                                        <div>
                                                            To:
                                                        </div>
                                                        <div>
                                                            {booking.end}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                }
                                {currentBookings.length > 0 &&
                                    <div className='current-bookings content-divider'>
                                        <h2 className='single-spot-header'>Your active booking</h2>
                                        {currentBookings.map(booking =>
                                            <div key={booking.id} className='single-booking-current'>
                                                <div className='booking-date'>
                                                    <div className='booking-check'>
                                                        <div>
                                                            Check-in:
                                                        </div>
                                                        <div>
                                                            {booking.start}
                                                        </div>
                                                    </div>
                                                    <div className='booking-check'>
                                                        <div>
                                                            Checkout:
                                                        </div>
                                                        <div>
                                                            {booking.end}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                }
                                {upcomingBookings.length > 0 &&
                                    <div className='upcoming-bookings content-divider'>
                                        <h2 className='single-spot-header'>Your upcoming bookings</h2>
                                        <div className='booking-list'>
                                            {upcomingBookings.map(booking =>
                                                <div key={booking.id} className='single-booking'>
                                                    <div className='booking-date'>
                                                        <div className='booking-check'>
                                                            <div>
                                                                Check-in:
                                                            </div>
                                                            <div>
                                                                {booking.start}
                                                            </div>
                                                        </div>
                                                        <div className='booking-check'>
                                                            <div>
                                                                Checkout:
                                                            </div>
                                                            <div>
                                                                {booking.end}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='booking-btns'>
                                                        <BookingEditFormModal bookings={Object.values(bookingState)} bookingInfo={booking} price={singleSpot.price} setEdited={setEdited} setAddDisabledDate={setAddDisabledDate} />
                                                        <CancelBookingModal booking={booking} canceled={canceled} setCanceled={setCanceled} spotName={singleSpot.name} />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                }
                            </div>
                            <div className='hovering-content'>
                                <div className='hovering-content-title'>
                                    ${Number(singleSpot.price)?.toLocaleString('en-US', { maximumFractionDigits: 0 })} <span>day</span>
                                </div>
                                <BookingForm user={user} spotId={singleSpot?.id} hostId={singleSpot.userId} price={singleSpot.price} canceled={canceled} setCanceled={setCanceled} stateTransfer={stateTransfer} setStateTransfer={setStateTransfer} edited={edited} setEdited={setEdited} addDisabledDate={addDisabledDate} setAddDisabledDate={setAddDisabledDate} />
                            </div>
                        </div>
                        <div className='spot-review-container'>
                            <h3 className='spot-review-header'>
                                <img className='review-star-image' src={ratingStar} alt='star' />
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
                        <SpotMap singleSpot={singleSpot} />
                        <div className='booking-form-bottom-fixed'>
                            <BookingFormFixed user={user} spotId={singleSpot?.id} hostId={singleSpot.userId} price={singleSpot.price} canceled={canceled} setCanceled={setCanceled} stateTransfer={stateTransfer} setStateTransfer={setStateTransfer} edited={edited} setEdited={setEdited} addDisabledDate={addDisabledDate} setAddDisabledDate={setAddDisabledDate} />
                        </div>
                        <div className='bottom-fixed-title'>
                            ${Number(singleSpot.price)?.toLocaleString('en-US', { maximumFractionDigits: 0 })} <span>day</span>
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
