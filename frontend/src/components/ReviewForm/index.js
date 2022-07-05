import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createReview, getReviewAvg } from '../../store/reviewReducer';
import './ReviewForm.css'

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
        <form className="review-form-container" onSubmit={handleSubmit}>
            <div className='review-error-container'>
                {(hasSubmitted && validationErrors.length > 0) && (
                    <ul className='review-form-errors'>
                        {validationErrors.map(error => (
                            <li key={error}>{error}</li>
                        ))}
                    </ul>
                )}
            </div>
            <label>Review</label>
            <textarea className='review-body' value={review} onChange={updateReview} required />
            <label>Rating</label>
            <div className='review-radio'>
                <div className='radio-inputs'>
                    <input type='radio' name='rating' value={1} onChange={updateRating} />
                    <input type='radio' name='rating' value={2} onChange={updateRating} />
                    <input type='radio' name='rating' value={3} onChange={updateRating} />
                    <input type='radio' name='rating' value={4} onChange={updateRating} />
                    <input type='radio' name='rating' value={5} onChange={updateRating} />
                </div>
                <div className='radio-labels'>
                    <label>1</label>
                    <label>2</label>
                    <label>3</label>
                    <label>4</label>
                    <label>5</label>
                </div>
            </div>
            <div className='post-review-submit-container'>
                <button className='post-review-submit' type='submit'>Post Review</button>
            </div>
            <div className='cancel-review-button-container'>
                <button className='cancel-review-button' type='button' onClick={handleCancelClick}>Cancel</button>
            </div>
        </form>
    )
}

export default ReviewForm;
