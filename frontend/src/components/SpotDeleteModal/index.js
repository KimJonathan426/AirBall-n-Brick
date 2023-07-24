import React, { useEffect, useState } from 'react';
import { Modal } from '../../context/Modal';
import SpotDeleteForm from './SpotDeleteForm';
import './SpotDeleteForm.css';

function SpotDeleteModal({ spotId, setUpdateState }) {

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
      <button className='spot-listing-delete-btn' onClick={() => setShowModal(true)}>Delete</button>
      {showModal && (
        <Modal onClose={() => setCloseModal(true)}>
          <SpotDeleteForm spotId={spotId} closeModal={closeModal} setCloseModal={setCloseModal} setUpdateState={setUpdateState} />
        </Modal>
      )}
    </>
  );
}

export default SpotDeleteModal;
