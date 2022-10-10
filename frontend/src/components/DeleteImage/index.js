import { useDispatch } from 'react-redux'
import { deleteImage, getSpotImages } from "../../store/spotReducer";

const DeleteImage = ({ spotId, imageId }) => {
    const dispatch = useDispatch();

    const onDelete = async () => {
        const res = await dispatch(deleteImage(imageId));

        if (res.message === 'Successfully Deleted') {
            const ele = document.getElementById(`image-${imageId}`);
            ele.classList = 'no-display';
            // await dispatch(getSpotImages(spotId));
        }
    }

    return (
        <button className='delete-image-btn' onClick={onDelete}>Delete Image</button>
    )
}

export default DeleteImage;
