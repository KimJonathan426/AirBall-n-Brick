import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import ConfirmDeleteSpot from './ConfirmDeleteSpot';

function ConfirmDeleteSpotModal({ spotId }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='delete-button' onClick={() => setShowModal(true)}>Delete Court</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ConfirmDeleteSpot spotId={spotId} setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default ConfirmDeleteSpotModal;
