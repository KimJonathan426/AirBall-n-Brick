import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { useRef } from 'react';
import { Modal } from '../../context/Modal';
import { DateRangePicker } from 'react-date-range';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBookings } from '../../store/bookingReducer';
import $ from 'jquery';
import listenForOutsideClicks from '../ListenForOutsideClicks';
import ConfirmBookingModal from '../ConfirmBookingModal';
import Loading from '../Loading';
import './BookingForm.css';

const BookingForm = ({ user, spotId, price, canceled, setCanceled, stateTransfer, setStateTransfer, edited, setEdited, addDisabledDate, setAddDisabledDate }) => {
    const dispatch = useDispatch();
    const bookingRef = useRef(null);
    const bookingState = useSelector(state => state.booking)
    const [reserve, setReserve] = useState(false);
    const [listening, setListening] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [focusedRange, setFocusedRange] = useState([0, 0]);
    const [disabledDates, setDisabledDates] = useState([]);

    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    useEffect(() => {
        listenForOutsideClicks(
            listening,
            setListening,
            bookingRef,
            setIsOpen)
    }, [listening]);

    const [state, setState] = useState(stateTransfer);

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(getBookings(spotId))

            if (bookingState) {

                const dates = [];

                for (let booking of Object.values(bookingState)) {
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
            setCanceled(false);
            setEdited(false);
            setLoading(true);
        }

        fetchData();
        // eslint-disable-next-line
    }, [dispatch, addDisabledDate, canceled, edited, setAddDisabledDate, setCanceled, setEdited, spotId])

    useEffect(() => {
        setState([
            {
                startDate: null,
                endDate: null,
                key: 'selection'
            }
        ])
    }, [edited])

    useEffect(() => {
        $(function () {
            const calendarElement = document.getElementsByClassName('rdrDateDisplayWrapper')[0];

            if (calendarElement && !calendarElement.classList.contains('fixed-wrapper')) {
                calendarElement.classList.add('hovering-wrapper');
            } else {
                calendarElement?.classList.add('fixed-wrapper');
            }

            const dateDisplay = document.getElementsByClassName('rdrDateDisplay')[0];
            const startInput = document.getElementsByClassName('rdrDateInput')[0]?.childNodes[0];
            const endInput = document.getElementsByClassName('rdrDateInput')[1]?.childNodes[0];

            dateDisplay?.classList.add('visible')
            startInput?.setAttribute('readonly', '')
            endInput?.setAttribute('disabled', '')
            endInput?.classList.add('rdrDisabled')

            const openCalendar = (e) => {
                e.preventDefault();

                setIsOpen(true);
            }

            startInput?.addEventListener('click', openCalendar);
            endInput?.addEventListener('click', openCalendar);

        });
    }, [loading, addDisabledDate]);

    useEffect(() => {
        $(function () {
            const dateElement = document.getElementsByClassName('rdrDateDisplayWrapper')[0];
            const repeatElement = document.getElementsByClassName('hover-dates')[0];

            if (dateElement && !dateElement.classList.contains('fixed-wrapper') && !repeatElement) {
                const newElement = document.createElement('div');
                const textElement = document.createElement('span');
                textElement.innerText = 'Select dates'

                newElement.className = 'select-dates hover-dates';
                newElement.appendChild(textElement);

                dateElement.insertBefore(newElement, dateElement.firstChild);
            }

            if (repeatElement && state[0].startDate && state[0].endDate) {
                const startDate = state[0].startDate;
                const endDate = state[0].endDate;

                const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                const startDateMonth = months[startDate.getMonth()];
                const startDateDay = startDate.getDate();
                const startDateYear = startDate.getFullYear();
                const endDateMonth = months[endDate.getMonth()];
                const endDateDay = endDate.getDate();
                const endDateYear = endDate.getFullYear();

                const days = Math.ceil((state[0].endDate.getTime() - state[0].startDate.getTime()) / (1000 * 3600 * 24)) + 1;
                const date = `${startDateMonth} ${startDateDay}, ${startDateYear} – ${endDateMonth} ${endDateDay}, ${endDateYear}`;

                const dateNode = document.createElement('span');
                dateNode.innerText = date;
                dateNode.className = 'select-dates-date'

                if (days > 1) repeatElement.innerText = days + ' days'
                else repeatElement.innerText = days + ' day'

                repeatElement.appendChild(dateNode)
            } else if (repeatElement && !state[0].startDate && !state[0].endDate) {
                repeatElement.innerText = 'Select dates'
            }

        });
    }, [loading, addDisabledDate, state])

    useEffect(() => {
        if (state[0].startDate) {
            $(function () {
                const ele = document.getElementsByClassName('rdrDateInput')[1]?.childNodes[0];
                ele?.removeAttribute('disabled');
                ele?.setAttribute('readonly', '');
                ele?.classList.remove('rdrDisabled')
            })
        } else if (!state[0].startDate) {
            $(function () {
                const ele = document.getElementsByClassName('rdrDateInput')[1]?.childNodes[0];
                ele?.removeAttribute('readonly');
                ele?.setAttribute('disabled', '');
                ele?.classList.add('rdrDisabled')
            })
        }

        if (state[0].startDate && state[0].endDate) {
            setReserve(true);
        } else {
            setReserve(false);
        }
    }, [state])

    useEffect(() => {
        setStateTransfer(state);
    }, [state, setStateTransfer])

    useEffect(() => {
        setState(stateTransfer);
    }, [stateTransfer])

    const clearDates = (e) => {
        e.preventDefault()

        setFocusedRange([0, 0]);

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
        loading ?
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
                        focusedRange={focusedRange}
                        onRangeFocusChange={setFocusedRange}
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
                        <div className='reserve-note-charge visible'>You won't be charged yet</div>
                        {showModal && (
                            <Modal onClose={() => setShowModal(false)}>
                                <ConfirmBookingModal userId={user} spotId={spotId} price={price} state={state} setState={setState} setShowModal={setShowModal} setAddDisabledDate={setAddDisabledDate} />
                            </Modal>
                        )}
                    </div>
                )}
                {reserve && !user && (
                    <div className='calendar-btns-container visible'>
                        <button disabled={true} className='reserve-disabled visible'><span>Reserve</span></button>
                        <div className='reserve-note-log visible'>Log in to reserve</div>
                    </div>
                )}

            </>
            :
            <Loading />
    )
}

export default BookingForm;
