import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { deleteBooking } from "../../store/bookingReducer";
import './CancelBooking.css'


function CancelBooking({ booking, setShowModal }) {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(true);
  const [disabled, setDisabled] = useState(false);

  const onDelete = async (e) => {
    e.preventDefault();

    setDisabled(true);

    const res = await dispatch(deleteBooking(booking.id));

    if (!res) {
      setDisabled(false);
    }
  }

  const closeModal = (e) => {
    e.preventDefault();

    setOpen(false);

    setTimeout(() => {
      setShowModal(false);
    }, 500)
  }


  return (
    open ?
      <div className='booking-cancel-container animate-modal'>
        <h2 className='booking-cancel-header'>Cancel Booking?</h2>
        <div className='confirm-cancel-container'>
          <div>
            {booking.Spot.name}
          </div>
          <img className='cancel-image' src={booking.url} alt='main spot' />
          <div>
            {booking.start} – {booking.end}
          </div>
        </div>
        <div className='booking-cancel-btns'>
          <button className='booking-cancel-return' onClick={closeModal}>Return</button>
          <button disabled={disabled} className={disabled ? 'booking-cancel-disabled' : 'booking-cancel-confirm'} onClick={onDelete}>Cancel Booking</button>
        </div>
      </div>

      :

      <div className='booking-cancel-container animate-modal-close'>
        <h2 className='booking-cancel-header'>Cancel Booking?</h2>
        <div className='confirm-cancel-container'>
          <div>
            {booking.Spot.name}
          </div>
          <img className='cancel-image' src={booking.url} alt='main spot' />
          <div>
            {booking.start} – {booking.end}
          </div>
        </div>
        <div className='booking-cancel-btns'>
          <button className='booking-cancel-return' onClick={closeModal}>Return</button>
          <button className='booking-cancel-confirm' onClick={onDelete}>Cancel Booking</button>
        </div>
      </div>
  );
}

export default CancelBooking;
