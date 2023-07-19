import { useEffect, useState } from 'react';
import {ReactComponent as RatingStar} from '../../../../images/rating-star.svg';
import '../Steps.css';
import './FinalReview.css';

const FinalReview = ({ images, title, price }) => {

    const [previewImg, setPreviewImg] = useState('')

    useEffect(() => {
        const reader = new FileReader();

            reader.onload = () => {
                setPreviewImg(reader.result);
            };

            reader.readAsDataURL(images[1]);
    }, []);

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
                    <button className='host-final-review-preview'>
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
                    <div>whats next</div>
                </div>
            </div>
        </div>
    );
};

export default FinalReview;
