import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getReviews, actionClearReviews } from '../../store/reviewReducer';

const SpotReviewList = ({ user, spotId }) => {
    const dispatch = useDispatch();
    const reviews = useSelector(state => state.review)

    useEffect(() => {
        dispatch(getReviews(spotId));

        return (
            () => dispatch(actionClearReviews())
        );
    }, [dispatch, spotId]);

    console.log('reviews', reviews)

    const reviewArray = Object.values(reviews);
    console.log('reviews state', reviews)

    return (
        <div>
            Reviews
            {reviews && reviewArray.map(review => (
                <div key={review.id}>
                    {review.User.username}
                    {review.rating}
                    {review.review}
                </div>
            ))}
        </div>
    )
}

export default SpotReviewList;
