import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createImages } from '../../store/spotReducer';
import loadingGif from '../../images/host-court-loading.gif';
import './SpotImagesForm.css'

const SpotImagesForm = ({ id, hideForm }) => {
    const dispatch = useDispatch();

    const [images, setImages] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [validationErrors, setValidationErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    useEffect(() => {
        if (images.length) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [images])

    const updateFiles = (e) => {
        setValidationErrors([]);
        const files = e.target.files;
        setImages(files);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);
        setUploading(true);
        setDisabled()

        const errors = [];

        for (let i = 0; i < images.length; i++) {
            if (images[i]?.type?.slice(0, 5) !== 'image') errors.push('Please make sure all files are valid images')
        }

        setValidationErrors(errors)

        if (validationErrors.length || errors.length ) {
            setUploading(false);
            return alert('Cannot submit, some errors need to be fixed!');
        }

        const payload = {
            id,
            images
        };

        const res = await dispatch(createImages(payload));

        if (res) {
            hideForm();
        }

        setUploading(false);
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
                {uploading ?
                    <button disabled={uploading} className='update-disabled' type='submit'>
                        <div className='spot-forms-loading'>
                            <img src={loadingGif} alt='loading...' />
                        </div>
                    </button>
                    :
                    <button disabled={disabled} className={disabled ? 'update-disabled' : 'update-spot-button'} type='submit'>Add Images</button>
                }
            </div>

            <div className='cancel-update-button-container'>
                <button className='cancel-update-button' type='button' onClick={handleCancelClick}>Cancel</button>
            </div>
        </form>
    )
}

export default SpotImagesForm;
