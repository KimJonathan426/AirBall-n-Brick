import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Redirect } from 'react-router-dom';
import { createReview } from '../../store/reviewReducer';

const ReviewForm = ({ spotId, hideForm }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.session.user);

    const [review, setReview] = useState('');
    const [rating, setRating] = useState(0);

    console.log('rating radio', rating)

    const updateReview = (e) => setReview(e.target.value);
    const updateRating = (e) => setRating(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            spotId: spotId,
            userId: user.id,
            review,
            rating
        };

        const res = await dispatch(createReview(payload));

        if (res) {
            hideForm();
        }
    }

    const handleCancelClick = (e) => {
        e.preventDefault();
        hideForm();
    }

    return (
        <form onSubmit={handleSubmit}>
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
