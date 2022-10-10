import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createImages } from '../../store/spotReducer';
import './SpotImagesForm.css'

const SpotImagesForm = ({ id, hideForm }) => {
    const dispatch = useDispatch();

    const [images, setImages] = useState([]);
    const [validationErrors, setValidationErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const updateFiles = (e) => {
        const files = e.target.files;
        setImages(files);
    };


    useEffect(() => {
        const errors = [];

        // if (address.length > 100) errors.push('Address cannot exceed 100 characters.');

        setValidationErrors(errors)
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);

        if (validationErrors.length) return alert('Cannot submit, some errors need to be fixed!');

        const payload = {
            id,
            images
        };

        const res = await dispatch(createImages(payload));

        if (res) {
            hideForm();
        }

        setHasSubmitted(false);
    }

    const handleCancelClick = (e) => {
        e.preventDefault();
        hideForm();
    }

    return (
        <form className='spot-edit-form-container' onSubmit={handleSubmit}>
            <div className='spot-edit-errors-container'>
                {(hasSubmitted && validationErrors.length > 0) && (
                    <ul className='spot-edit-form-errors'>
                        {validationErrors.map(error => (
                            <li key={error}>{error}</li>
                        ))}
                    </ul>
                )}
            </div>
            <label>Multiple Image Upload</label>
                <input
                    type="file"
                    multiple
                    onChange={updateFiles} />

            <div className='update-spot-button-container'>
                <button className='update-spot-button' type='submit'>Add Images</button>
            </div>

            <div className='cancel-update-button-container'>
                <button className='cancel-update-button' type='button' onClick={handleCancelClick}>Cancel</button>
            </div>
        </form>
    )
}

export default SpotImagesForm;
