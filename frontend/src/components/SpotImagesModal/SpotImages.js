import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleSpot } from "../../store/spotReducer";
import DeleteImage from "../DeleteImage";
import Loading from "../Loading";

const SpotImages = ({ setRefresh, setShowModal, user, spot }) => {
    const dispatch = useDispatch();
    const imagesFromState = useSelector(state => state.spot.images)

    const [open, setOpen] = useState(true);
    const [images, setImages] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setImages(Object.values(imagesFromState));
    }, [imagesFromState])

    useEffect(() => {
        const fetchData = async () => {
            const res = await dispatch(getSingleSpot(spot.id))

            setImages(res?.images)
            setLoading(true);
        }

        fetchData();
    }, [dispatch])

    const closeModal = (e) => {
        e.preventDefault();

        setOpen(false);

        setTimeout(() => {
            setShowModal(false);
            setRefresh(true);
        }, 500)
    }

    return (
        loading ? open ?
            <>
                <div className='all-photos-modal-container animate-modal'>
                    <button onClick={closeModal} className='exit-modal'><span>❮</span></button>
                    <div className='show-all-photos-container'>
                        <div className='wrapper'>
                            {images.map(image =>
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
