import React, { useState, useEffect } from 'react';
import { Modal } from '../../context/Modal';
import SpotEditForm from './SpotEditForm';
import './SpotEditForm.css';

function SpotEditModal({ spot, setUpdateState }) {

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
      <button className='spot-listing-edit-btn' onClick={() => setShowModal(true)}>Edit</button>
      {showModal && (
        <Modal onClose={() => setCloseModal(true)}>
          <SpotEditForm spot={spot} closeModal={closeModal} setCloseModal={setCloseModal} setUpdateState={setUpdateState} />
        </Modal>
      )}
    </>
  );
}

export default SpotEditModal;
