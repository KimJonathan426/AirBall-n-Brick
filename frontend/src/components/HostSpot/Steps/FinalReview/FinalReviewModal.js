import { useSelector } from 'react-redux';
import { ReactComponent as ClearX } from '../../../../images/clear-x-thin.svg';
import './FinalReviewModal.css';

const FinalReviewModal = ({ previewImg, title, description, address, city, state, zipcode, country }) => {

    const username = useSelector(state => state.session.user.username);


    return (
        <div className='final-review-modal-container-open'>
            <div className='final-review-modal-title'>
                <button className='exit-final-review-modal'><ClearX /></button>
                <h1 className='final-review-modal-title-text'>Full preview</h1>
            </div>
            <div className='final-review-modal-content'>
                <div className='final-review-modal-preview'>
                    <img className='final-review-modal-preview-img' src={previewImg} alt='court cover' />
                </div>
                <div className='final-review-modal-info'>
                    <h1 className='final-review-modal-info-title'>{title}</h1>
                    <h2 className='final-review-modal-info-user'>Hosted by {username}</h2>
                    <div className='final-review-modal-info-description'>{description}</div>
                    <div style={{ padding: '32px 0' }}>
                        <h3 className='final-review-modal-info-location'>Location</h3>
                        <div style={{ lineHeight: '20px' }}>
                            {address}, {city}, {state}, {zipcode}, {country}
                        </div>
                        <div className='final-review-modal-info-location-notice'>
                            We'll only share your address with guests who are booked.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FinalReviewModal;
