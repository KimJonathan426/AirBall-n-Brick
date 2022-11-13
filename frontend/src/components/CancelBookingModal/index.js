import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CancelBooking from './CancelBooking';
import './CancelBooking.css';

function CancelBookingModal({ booking, setCanceled, spotName }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='cancel-booking-btn' onClick={() => setShowModal(true)}>Cancel Booking</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CancelBooking booking={booking} setShowModal={setShowModal} setCanceled={setCanceled} spotName={spotName} />
        </Modal>
      )}
    </>
  );
}

export default CancelBookingModal;
