import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import BookingEditForm from './BookingEditForm';
import './BookingEditForm.css'

function BookingEditFormModal({ bookings, bookingInfo, setEdited }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='edit-booking-btn' onClick={() => setShowModal(true)}>Edit Booking</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <BookingEditForm bookings={bookings} bookingInfo={bookingInfo} setShowModal={setShowModal} setEdited={setEdited} />
        </Modal>
      )}
    </>
  );
}

export default BookingEditFormModal;
