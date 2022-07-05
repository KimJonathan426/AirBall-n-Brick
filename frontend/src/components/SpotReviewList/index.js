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

    let stars;

    const assignStars = (rating) => {
        switch (rating) {
            case 1:
                return stars = (
                    <img className='single-review-star' src={ratingStar} />
                )
            case 2:
                return stars = (
                    <>
                        <img className='single-review-star' src={ratingStar} />
                        <img className='single-review-star' src={ratingStar} />
                    </>
                )
            case 3:
                return stars =  (
                    <>
                        <img className='single-review-star' src={ratingStar} />
                        <img className='single-review-star' src={ratingStar} />
                        <img className='single-review-star' src={ratingStar} />
                    </>
                )
            case 4:
                return stars = (
                    <>
                        <img className='single-review-star' src={ratingStar} />
                        <img className='single-review-star' src={ratingStar} />
                        <img className='single-review-star' src={ratingStar} />
                        <img className='single-review-star' src={ratingStar} />
                    </>
                )
            case 5:
                return stars = (
                    <>
                        <img className='single-review-star' src={ratingStar} />
                        <img className='single-review-star' src={ratingStar} />
                        <img className='single-review-star' src={ratingStar} />
                        <img className='single-review-star' src={ratingStar} />
                        <img className='single-review-star' src={ratingStar} />
                    </>
                )
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
                                dispatch(actionClearReviewAvgs());
                                dispatch(getReviewAvg());
                            }}>Delete Review</button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}

export default SpotReviewList;
