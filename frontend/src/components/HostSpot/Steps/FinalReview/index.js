import { useEffect, useState } from 'react';
import { ReactComponent as RatingStar } from '../../../../images/rating-star.svg';
import { ReactComponent as ConfirmCheck } from '../../../../images/final-review/confirm.svg';
import { ReactComponent as CalendarCheck } from '../../../../images/final-review/calendar.svg';
import { ReactComponent as SettingsPen } from '../../../../images/final-review/settings-pen.svg';
import { Modal } from '../../../../context/Modal';
import FinalReviewModal from './FinalReviewModal';
import '../Steps.css';
import './FinalReview.css';

const FinalReview = ({ images, title, description, price, address, city, state, zipcode, country }) => {

    const [previewImg, setPreviewImg] = useState('');
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const reader = new FileReader();

        reader.onload = () => {
            setPreviewImg(reader.result);
        };

        reader.readAsDataURL(images[0]);
    }, [images]);

    return (
        <div className='host-step-container-center'>
            <div className='host-final-review-container-inner'>
                <div className='host-final-review-top'>
                    <h1 className='host-final-review-header'>
                        Review your listing
                    </h1>
                    <div className='host-final-review-subheader'>
                        Here's what we'll show guests. Make sure everything looks good.
                    </div>
                </div>
                <div className='host-final-review-bottom'>
                    <button className='host-final-review-preview' onClick={() => setShowModal(true)}>
                        <div className='host-final-review-preview-main'>
                            <div className='host-preview-main-label'>Show preview</div>
                            <img className='host-preview-main-img' src={previewImg} alt='court cover' />
                        </div>
                        <div className='host-preview-text-box'>
                            <div className='host-preview-text-box-inner'>
                                <div className='host-preview-text-1'>{title}</div>
                                <div className='host-preview-text-1' style={{ marginBottom: '0' }}>${price} <span style={{ fontWeight: 'normal' }}>day</span></div>
                            </div>
                            <div className='host-preview-text-box-2'>
                                New &nbsp;
                                <RatingStar className='host-preview-rating-star' />
                            </div>
                        </div>
                    </button>
                    {showModal && (
                        <Modal onClose={() => setShowModal(false)}>
                            <FinalReviewModal previewImg={previewImg} title={title} description={description}
                            address={address} city={city} state={state} zipcode={zipcode} country={country}
                            setShowModal={setShowModal} />
                        </Modal>
                    )}
                    <div className='host-final-review-info'>
                        <h2 className='host-final-review-info-header'>What's next?</h2>
                        <div className='host-final-review-info-item'>
                            <div style={{ marginRight: '16px' }}><ConfirmCheck /></div>
                            <div className='host-final-review-item-inner'>
                                <h3 className='host-final-review-item-header'>
                                    Confirm details and publish
                                </h3>
                                <div className='host-final-review-item-subheader'>
                                    We'll let you know if you need to perform any additional steps in the future.
                                </div>
                            </div>
                        </div>
                        <div className='host-final-review-info-item'>
                            <div style={{ marginRight: '16px' }}><CalendarCheck /></div>
                            <div className='host-final-review-item-inner'>
                                <h3 className='host-final-review-item-header'>
                                    Mark your calendar
                                </h3>
                                <div className='host-final-review-item-subheader'>
                                    Keep a look out for new and existing bookings.
                                </div>
                            </div>
                        </div>
                        <div className='host-final-review-info-item'>
                            <div style={{ marginRight: '16px' }}><SettingsPen /></div>
                            <div className='host-final-review-item-inner'>
                                <h3 className='host-final-review-item-header'>
                                    Adjust your settings
                                </h3>
                                <div className='host-final-review-item-subheader'>
                                    Update your listing, maintain your court, and continue hosting a great game.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FinalReview;
