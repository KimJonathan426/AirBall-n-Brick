import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleSpot } from "../../store/spotReducer";
import DeleteImage from "../DeleteImage";
import Loading from "../Loading";

const SpotImages = ({ setShowModal, user, spot }) => {
    const dispatch = useDispatch();
    const images = useSelector(state => state.spot.images)

    const [open, setOpen] = useState(true);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            await dispatch(getSingleSpot(spot.id))

            setLoading(true);
        }

        fetchData();
    }, [dispatch])

    const closeModal = (e) => {
        e.preventDefault();

        setOpen(false);

        setTimeout(() => {
            setShowModal(false);
        }, 500)
    }

    return (
        loading ? open ?
            <>
                <div className='all-photos-modal-container animate-modal'>
                    <button onClick={closeModal} className='exit-modal'><span>❮</span></button>
                    <div className='show-all-photos-container'>
                        <div className='wrapper'>
                            {Object.values(images).map(image =>
                                <div className='show-all-single-image' key={image.id} id={`image-${image.id}`}>
                                    <img src={image.url} alt='spot image' />
                                    {user === spot.userId &&
                                        <DeleteImage spotId={spot.id} imageId={image.id} />
                                    }
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </>
            :
            <>
                <div className='all-photos-modal-container animate-modal-close'>
                    <button onClick={closeModal} className='exit-modal'><span>❮</span></button>
                    <div className='show-all-photos-container'>
                        <div className='wrapper'>
                            {images.map(image =>
                                <div key={image.id}>
                                    <img src={image.url} alt='spot image' />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </>
            :
            <Loading />
    )
}

export default SpotImages;
