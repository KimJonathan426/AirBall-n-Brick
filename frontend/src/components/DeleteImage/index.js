import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { deleteImage, getSpotImages } from "../../store/spotReducer";
import './DeleteImage.css';

const DeleteImage = ({ spotId, imageId }) => {
    const dispatch = useDispatch();

    const [errors, setErrors] = useState([]);

    const onDelete = async () => {

        const payload = {
            spotId,
            imageId
        }

        const res = await dispatch(deleteImage(payload));

        if (res.message === 'Successfully Deleted') {
            const ele = document.getElementById(`image-${imageId}`);
            ele.classList = 'no-display';
        } else {
            setErrors([res.message]);
        }
    }

    return (
        <>
            <button className='delete-image-btn' onClick={onDelete}>Delete Image</button>
            {errors.length > 0 &&
            <section className='delete-image-error-box'>
                <ul className='spot-edit-form-errors delete-image-error'>
                    <li>{errors}</li>
                </ul>
            </section>
            }
        </>
    )
}

export default DeleteImage;
