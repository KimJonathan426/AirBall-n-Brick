import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import BookingEditForm from './BookingEditForm';
import './BookingEditForm.css'

function BookingEditFormModal({ bookings, bookingInfo, price, setEdited, setAddDisabledDate }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='edit-booking-btn' onClick={() => setShowModal(true)}>Edit Booking</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <BookingEditForm bookings={bookings} bookingInfo={bookingInfo} price={price} setShowModal={setShowModal} setEdited={setEdited} setAddDisabledDate={setAddDisabledDate} />
        </Modal>
      )}
    </>
  );
}

export default BookingEditFormModal;
