import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getReviews, getReviewAvg, deleteReview, actionClearReviews, actionClearReviewAvgs } from '../../store/reviewReducer';

const SpotReviewList = ({ user, spotId }) => {
    const dispatch = useDispatch();
    const reviews = useSelector(state => state.review)

    useEffect(() => {
        dispatch(getReviews(spotId));

        return (
            () => dispatch(actionClearReviews())
        );
    }, [dispatch, spotId]);

    const reviewArray = Object.values(reviews.reviews);

    return (
        <div>
            Reviews
            {reviews && reviewArray.map(review => (
                <div key={review.id}>
                    {review.User.username}
                    {review.rating}
                    {review.review}
                    {review.userId === user && (
                        <button onClick={async (e) => {
                            e.preventDefault();
                            await dispatch(deleteReview(review.id));
                            dispatch(actionClearReviewAvgs());
                            dispatch(getReviewAvg());
                        }}>Delete Review</button>
                    )}
                </div>
            ))}
        </div>
    )
}

export default SpotReviewList;
