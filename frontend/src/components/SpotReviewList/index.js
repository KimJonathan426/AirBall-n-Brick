import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getReviews } from '../../store/reviewReducer';

const SpotReviewList = ({ spotId }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getReviews(spotId));
    }, [dispatch]);

    return (
        <div>
            Reviews for this spot.
        </div>
    )
}

export default SpotReviewList;
