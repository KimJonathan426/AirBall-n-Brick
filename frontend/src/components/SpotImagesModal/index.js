import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SpotImages from './SpotImages';
import showPhotosSvg from '../../images/show-photos.svg';
import './SpotImages.css'

function SpotImagesModal({ setRefresh, user, spot }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className='show-all-photos-btn' onClick={() => setShowModal(true)}>
                <div className='show-all-photos-btn-content'>
                    <img className='show-photos-svg' src={showPhotosSvg} alt='9 dots in the form of a square' />
                    <div className='show-all-photos-btn-text'>Show all photos</div>
                </div>
            </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <SpotImages setRefresh={setRefresh} setShowModal={setShowModal} user={user} spot={spot} />
                </Modal>
            )}
        </>
    );
}

export default SpotImagesModal;
