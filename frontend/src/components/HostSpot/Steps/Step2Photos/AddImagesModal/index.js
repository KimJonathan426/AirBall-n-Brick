import React, { useState, useEffect } from 'react';
import { Modal } from '../../../../../context/Modal';
import AddImages from './AddImages';
import './AddImages.css';

function AddImagesModal({ spotId, setUpdateState }) {

    const [showModal, setShowModal] = useState(false);
    const [closeModal, setCloseModal] = useState(false);

    useEffect(() => {
        if (!closeModal) {
            return;
        };

        const timeoutId = setTimeout(() => {
            setShowModal(false);
            setCloseModal(false);
        }, 400);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [closeModal]);

  return (
    <>
      <button className='spot-add-images-btn' onClick={() => setShowModal(true)}>Add images</button>
      {showModal && (
        <Modal onClose={() => setCloseModal(true)}>
          <AddImages spotId={spotId} closeModal={closeModal} setCloseModal={setCloseModal} setUpdateState={setUpdateState} />
        </Modal>
      )}
    </>
  );
}

export default AddImagesModal;
