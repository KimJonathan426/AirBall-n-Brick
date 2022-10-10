import { useState } from "react";

const SpotImages = ({ setShowModal, images }) => {

    const [open, setOpen] = useState(true);

    const closeModal = (e) => {
        e.preventDefault();

        setOpen(false);

        setTimeout(() => {
            setShowModal(false);
        }, 500)
    }

    return (
        open ?
            <>
                <div className='all-photos-modal-container animate-modal'>
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
    )
}

export default SpotImages;
