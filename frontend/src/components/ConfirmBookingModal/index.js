import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { createBooking } from '../../store/bookingReducer';
import './ConfirmBookingModal.css';

function ConfirmBookingModal({ userId, spotId, price, startDate, endDate, setShowModal }) {
    const dispatch = useDispatch();

    const [open, setOpen] = useState(true);

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const startDateMonth = months[startDate.getMonth()];
    const startDateDay = startDate.getDate();
    const endDateMonth = months[endDate.getMonth()];
    const endDateDay = endDate.getDate();
    const endDateYear = endDate.getFullYear();

    const nights = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)) + 1;
    const serviceFee = (price * nights) * .142;

    let date = `${startDateMonth} ${startDateDay} – ${endDateDay}`;

    if (startDateMonth !== endDateMonth) {
        date = `${startDateMonth} ${startDateDay} – ${endDateMonth} ${endDateDay}, ${endDateYear}`;
    }

    const submitBooking = async (e) => {
        e.preventDefault();

        const payload = {
            userId,
            spotId,
            startDate,
            endDate
        };

        const res = await dispatch(createBooking(payload));

        if (res) {
            console.log('worked');
            setShowModal(false);
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
        <section className='price-container'>
            <h2 className='confirm-booking-header'>
                Confirm Booking
            </h2>
            <div className='price-list'>
                <h2 className='price-list-header'>
                    Your trip
                </h2>
                <h3 className='detail-headers'>
                    Dates
                </h3>
                <div className='date-booking-info'>
                    {date}
                </div>
                <h3 className='detail-headers'>
                    Price Details
                </h3>
                <div className='price-booking-info'>
                    <div>
                        ${Number(price).toLocaleString('en-US', { minimumFractionDigits: 2 })} x {nights} nights
                    </div>
                    <div>
                        ${(price * nights).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </div>
                </div>
                <div className='price-booking-info'>
                    <div>
                        Service fee
                    </div>
                    <div>
                        ${(serviceFee).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                </div>
            </div>
            <div className='price-total'>
                <div>
                    Total
                </div>
                <div>
                    ${(price * nights + serviceFee).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
            </div>
            <div className='confirm-booking-btns'>
                <div>
                    <button className='cancel-booking' onClick={closeModal}>Cancel</button>
                </div>
                <div>
                    <button className='confirm-booking' onClick={submitBooking} >Confirm</button>
                </div>
            </div>
        </section>
    );
}

export default ConfirmBookingModal;
