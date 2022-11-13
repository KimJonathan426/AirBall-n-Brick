import { useDispatch } from 'react-redux'
import { deleteImage } from "../../store/spotReducer";
import './DeleteImage.css';

const DeleteImage = ({ spotId, imageId, setErrors }) => {
    const dispatch = useDispatch();

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
        <button className='delete-image-btn' onClick={onDelete}>Delete Image</button>
    )
}

export default DeleteImage;
