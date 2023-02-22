import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleSpot } from "../../store/spotReducer";
import leftArrow from '../../images/left-arrow.svg'
import DeleteImage from "../DeleteImage";
import Loading from "../Loading";

const SpotImages = ({ setRefresh, setShowModal, user, spot }) => {
    const dispatch = useDispatch();
    const imagesFromState = useSelector(state => state.spot.images)

    const [open, setOpen] = useState(true);
    const [images, setImages] = useState(true);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        document.body.style.overflowY = 'hidden';
        return () => {
            document.body.style.overflowY = 'unset'
        }
    }, [])

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
    }, [dispatch, spot.id])

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
                    <div className='exit-modal-container'>
                        <button onClick={closeModal} className='exit-modal'><img className='exit-arrow' src={leftArrow} alt='left arrow' /></button>
                        {errors.length > 0 &&
                            <section className='delete-image-error-box'>
                                <ul className='spot-edit-form-errors delete-image-error'>
                                    <li>{errors}</li>
                                </ul>
                            </section>
                        }
                    </div>
                    <div className='show-all-photos-container'>
                        <div className='wrapper-container'>
                            <div className='wrapper'>
                                {images.map(image =>
                                    <div className='show-all-single-image' key={image.id} id={`image-${image.id}`}>
                                        <img src={image.url} alt='listing' />
                                        {user === spot.userId &&
                                            <DeleteImage spotId={spot.id} imageId={image.id} setErrors={setErrors} />
                                        }
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </>
            :
            <>
                <div className='all-photos-modal-container animate-modal-close'>
                    <div className='exit-modal-container'>
                        <button onClick={closeModal} className='exit-modal'><img className='exit-arrow' src={leftArrow} alt='left arrow' /></button>
                    </div>
                    <div className='show-all-photos-container'>
                        <div className='wrapper-container'>
                            <div className='wrapper'>
                                {images.map(image =>
                                    <div className='show-all-single-image' key={image.id} id={`image-${image.id}`}>
                                        <img src={image.url} alt='listing' />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </>
            :
            <Loading />
    )
}

export default SpotImages;
