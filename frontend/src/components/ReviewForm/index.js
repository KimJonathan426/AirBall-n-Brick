import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createReview, getReviewAvg } from '../../store/reviewReducer';

const ReviewForm = ({ spotId, hideForm }) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);

    const [review, setReview] = useState('');
    const [rating, setRating] = useState(0);
    const [validationErrors, setValidationErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const updateReview = (e) => setReview(e.target.value);
    const updateRating = (e) => setRating(e.target.value);

    useEffect(() => {
        const errors = [];

        if (review.length > 1000) errors.push('Review cannot exceed 1000 characters.');
        if (rating === 0) errors.push('Please select a rating you wish to give the court.')

        setValidationErrors(errors);
    }, [review, rating])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);

        if (validationErrors.length) return alert('Cannot post review, some errors need to be fixed!');

        const payload = {
            spotId: spotId,
            userId: user.id,
            review,
            rating
        };

        const res = await dispatch(createReview(payload));

        if (res) {
            hideForm();
            dispatch(getReviewAvg());
        }

        setHasSubmitted(false);
    }

    const handleCancelClick = (e) => {
        e.preventDefault();
        hideForm();
    }

    return (
        <form onSubmit={handleSubmit}>
            {(hasSubmitted && validationErrors.length > 0) && (
                <ul className='errors'>
                    {validationErrors.map(error => (
                        <li key={error}>{error}</li>
                    ))}
                </ul>
            )}
            <label>Review</label>
            <textarea value={review} onChange={updateReview} required />
            <label>Rating</label>
            <label>
                <input type='radio' name='rating' value={1} onChange={updateRating} />
                1
            </label>
            <label>
                <input type='radio' name='rating' value={2} onChange={updateRating} />
                2
            </label>
            <label>
                <input type='radio' name='rating' value={3} onChange={updateRating} />
                3
            </label>
            <label>
                <input type='radio' name='rating' value={4} onChange={updateRating} />
                4
            </label>
            <label>
                <input type='radio' name='rating' value={5} onChange={updateRating} />
                5
            </label>
            <button type='submit'>Post Review</button>
            <button type='button' onClick={handleCancelClick}>Cancel</button>
        </form>
    )
}

export default ReviewForm;
