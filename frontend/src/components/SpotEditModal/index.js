import React, { useState, useEffect } from 'react';
import { Modal } from '../../context/Modal';
import SpotEditForm2 from './SpotEditForm';
import './SpotEditForm.css';

function SpotEditModal({ spot }) {

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
          <SpotEditForm2 spot={spot} closeModal={closeModal} setCloseModal={setCloseModal}/>
        </Modal>
      )}
    </>
  );
}

export default SpotEditModal;
