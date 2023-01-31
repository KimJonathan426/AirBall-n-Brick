import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getReviews, getReviewAvg, deleteReview, actionClearReviews, actionClearReviewAvgs } from '../../store/reviewReducer';
import './SpotReviewList.css';

const SpotReviewList = ({ user, spotId, ratingStar }) => {
    const dispatch = useDispatch();
    const reviews = useSelector(state => state.review)

    useEffect(() => {
        dispatch(getReviews(spotId));

        return (
            () => dispatch(actionClearReviews())
        );
    }, [dispatch, spotId]);

    const reviewArray = Object.values(reviews.reviews);
    const reviewLength = Object.values(reviews.reviews).length;

    const assignStars = (rating) => {
        switch (rating) {
            case 1:
                return (
                    <img className='single-review-star' src={ratingStar} alt='rating star' />
                )
            case 2:
                return (
                    <>
                        <img className='single-review-star' src={ratingStar} alt='rating star' />
                        <img className='single-review-star' src={ratingStar} alt='rating star' />
                    </>
                )
            case 3:
                return (
                    <>
                        <img className='single-review-star' src={ratingStar} alt='rating star' />
                        <img className='single-review-star' src={ratingStar} alt='rating star' />
                        <img className='single-review-star' src={ratingStar} alt='rating star' />
                    </>
                )
            case 4:
                return (
                    <>
                        <img className='single-review-star' src={ratingStar} alt='rating star' />
                        <img className='single-review-star' src={ratingStar} alt='rating star' />
                        <img className='single-review-star' src={ratingStar} alt='rating star' />
                        <img className='single-review-star' src={ratingStar} alt='rating star' />
                    </>
                )
            case 5:
                return (
                    <>
                        <img className='single-review-star' src={ratingStar} alt='rating star' />
                        <img className='single-review-star' src={ratingStar} alt='rating star' />
                        <img className='single-review-star' src={ratingStar} alt='rating star' />
                        <img className='single-review-star' src={ratingStar} alt='rating star' />
                        <img className='single-review-star' src={ratingStar} alt='rating star' />
                    </>
                )
            default:
                return (null)
        }
    }

    return (
        <div className='spot-reviews-container'>
            {reviews && reviewArray.map(review => (
                <div className='single-review' key={review.id}>
                    <h3>
                        {review.User.username}
                        {assignStars(review.rating)}
                    </h3>
                    <div className='review-body'>
                        {review.review}
                    </div>
                    {review.userId === user && (
                        <div className='delete-review-button-container'>
                            <button className='delete-review-button' onClick={async (e) => {
                                e.preventDefault();
                                await dispatch(deleteReview(review.id));
                                if (reviewLength === 1) {
                                    dispatch(actionClearReviewAvgs());
                                    dispatch(getReviewAvg());
                                } else {
                                    dispatch(getReviewAvg());
                                }
                            }}>Delete Review</button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}

export default SpotReviewList;
