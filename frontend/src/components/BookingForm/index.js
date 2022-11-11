import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { useRef } from 'react';
import { Modal } from '../../context/Modal';
import { DateRangePicker } from 'react-date-range';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getBookings } from '../../store/bookingReducer';
import $ from 'jquery';
import listenForOutsideClicks from '../ListenForOutsideClicks';
import ConfirmBookingModal from '../ConfirmBookingModal';
import Loading from '../Loading';
import './BookingForm.css';

const BookingForm = ({ user, spotId, price }) => {
    const dispatch = useDispatch();
    const bookingRef = useRef(null);

    const [reserve, setReserve] = useState(false);
    const [listening, setListening] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [disabledDates, setDisabledDates] = useState([]);
    const [addDisabledDate, setAddDisabledDate] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    useEffect(listenForOutsideClicks(
        listening,
        setListening,
        bookingRef,
        setIsOpen)
    );

    const [state, setState] = useState([
        {
            startDate: null,
            endDate: null,
            key: 'selection'
        }
    ]);

    useEffect(() => {
        const fetchData = async () => {
            const spotBookings = await dispatch(getBookings(spotId))

            if (spotBookings) {

                const dates = [];

                for (let booking of Object.values(spotBookings)) {
                    const startDate = new Date(booking.startDate);
                    const endDate = new Date(booking.endDate);

                    const date = new Date(startDate.getTime());

                    while (date <= endDate) {
                        dates.push(new Date(date));
                        date.setDate(date.getDate() + 1);
                    }

                }
                setDisabledDates(dates);
            }

            setAddDisabledDate(false);
            setLoading(true);
        }

        fetchData();
    }, [dispatch, addDisabledDate])

    useEffect(() => {
        $(function () {
            const dateElement = document.getElementsByClassName('rdrDateDisplayWrapper')[0];
            const startInput = document.getElementsByClassName('rdrDateInput')[0]?.childNodes[0];
            const endInput = document.getElementsByClassName('rdrDateInput')[1]?.childNodes[0];

            startInput?.setAttribute('readonly', '')
            endInput?.setAttribute('disabled', '')
            endInput?.classList.add('rdrDisabled')

            const openCalendar = (e) => {
                e.preventDefault();

                setIsOpen(true);
            }

            startInput?.addEventListener('click', openCalendar);
            endInput?.addEventListener('click', openCalendar);

            const repeatElement = document.getElementsByClassName('select-dates')[0];

            if (!repeatElement) {
                const newElement = document.createElement('div');
                const textNode = document.createTextNode('Select dates');

                newElement.className = 'select-dates';
                newElement.appendChild(textNode);

                dateElement?.insertBefore(newElement, dateElement.firstChild);
            }
        });
    }, [loading, addDisabledDate]);

    useEffect(() => {
        if (state[0].startDate) {
            $(function () {
                const ele = document.getElementsByClassName('rdrDateInput')[1]?.childNodes[0];
                ele?.removeAttribute('disabled');
                ele?.setAttribute('readonly', '');
                ele?.classList.remove('rdrDisabled')
            })
        }

        if (state[0].startDate && state[0].endDate) {
            setReserve(true);
        } else {
            setReserve(false);
        }
    }, [state[0].startDate, state[0].endDate])

    const clearDates = (e) => {
        e.preventDefault()

        setState([
            {
                startDate: null,
                endDate: null,
                key: 'selection'
            }
        ]);
    };

    const closeCalendar = (e) => {
        e.preventDefault();

        setIsOpen(false);
    }


    return (
        loading && !addDisabledDate ?
            <>
                <label className='check-in-label'></label>
                <label className='check-out-label'></label>
                <div ref={bookingRef} className={isOpen ? 'calendar-container-visible ' : 'calendar-container-hidden'}>
                    <DateRangePicker
                        className='calendar'
                        editableDateInputs={true}
                        onChange={item => setState([item.selection])}
                        moveRangeOnFirstSelection={false}
                        showSelectionPreview={true}
                        months={2}
                        direction="horizontal"
                        preventSnapRefocus={true}
                        calendarFocus="forwards"
                        ranges={state}
                        minDate={new Date()}
                        disabledDates={disabledDates}
                        startDatePlaceholder='Start'
                        endDatePlaceholder='End'
                        dateDisplayFormat='MM/d/yyyy'
                    />
                    {!reserve && (
                        <div className='check-btn-container visible'>
                            <button className='check-btn visible' onClick={toggle}>Check availability</button>
                        </div>
                    )}

                    <div className={isOpen ? reserve ? 'clear-close-container-1 visible' : 'clear-close-container-2 visible' : 'none'}>
                        <button className='clear-btn' onClick={clearDates}>Clear dates</button>
                        <button className='close-btn' onClick={closeCalendar}>Close</button>
                    </div>

                </div>

                {reserve && user && (
                    <div className='calendar-btns-container visible'>
                        <button className='reserve-btn visible' onClick={() => setShowModal(true)}>Reserve</button>
                        <div className='reserve-note visible'>You won't be charged yet</div>
                        {showModal && (
                            <Modal onClose={() => setShowModal(false)}>
                                <ConfirmBookingModal userId={user} spotId={spotId} price={price} state={state} setState={setState} setShowModal={setShowModal} setAddDisabledDate={setAddDisabledDate} />
                            </Modal>
                        )}
                    </div>
                )}
                {reserve && !user && (
                    <div className='calendar-btns-container visible'>
                        <button disabled={true} className='reserve-btn reserve-disabled visible'>Reserve</button>
                        <div className='reserve-note visible'>Log in to reserve</div>
                    </div>
                )}

            </>
            :
            <Loading />
    )
}

export default BookingForm;
