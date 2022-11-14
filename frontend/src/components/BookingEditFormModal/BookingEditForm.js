import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRangePicker } from 'react-date-range';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { editBooking } from '../../store/bookingReducer';
import $ from 'jquery';
import Loading from '../Loading';
import './BookingEditForm.css';


const BookingEditForm = ({ bookings, bookingInfo, setShowModal, setEdited }) => {
    const dispatch = useDispatch();

    const startDate = new Date(bookingInfo.startDate);
    const endDate = new Date(bookingInfo.endDate);

    const [focusedRange, setFocusedRange] = useState([0, 0]);
    const [disabledDates, setDisabledDates] = useState([]);
    const [disabled, setDisabled] = useState(true);
    const [selectDates, setSelectDates] = useState('');
    const [nights, setNights] = useState('Select dates');

    const [loading, setLoading] = useState(false);

    const [state, setState] = useState([
        {
            startDate: startDate,
            endDate: endDate,
            key: 'selection'
        }
    ]);

    useEffect(() => {
        const fetchData = async () => {
                const dates = [];

                for (let booking of bookings) {
                    if (booking.id === bookingInfo.id) {
                        continue;
                    }

                    const bookingStart = new Date(booking.startDate);
                    const bookingEnd = new Date(booking.endDate);

                    const date = new Date(bookingStart.getTime());

                    while (date <= bookingEnd) {
                        dates.push(new Date(date));
                        date.setDate(date.getDate() + 1);
                    }

                }

            setDisabledDates(dates);
            setLoading(true);
        }

        fetchData();
    }, [dispatch])

    useEffect(() => {
            if (state[0].startDate && state[0].endDate) {
                const startDate = state[0].startDate;
                const endDate = state[0].endDate;

                const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                const startDateMonth = months[startDate.getMonth()];
                const startDateDay = startDate.getDate();
                const startDateYear = startDate.getFullYear();
                const endDateMonth = months[endDate.getMonth()];
                const endDateDay = endDate.getDate();
                const endDateYear = endDate.getFullYear();

                const nights = Math.ceil((state[0].endDate.getTime() - state[0].startDate.getTime()) / (1000 * 3600 * 24)) + 1;
                const date = `${startDateMonth} ${startDateDay}, ${startDateYear} – ${endDateMonth} ${endDateDay}, ${endDateYear}`;

                setSelectDates(date);

                if (nights > 1) setNights(`${nights} nights`);
                else setNights(`${nights} night`);

            }
    }, [loading, state[0].startDate, state[0].endDate]);

    useEffect(() => {
        if (state[0].startDate?.getTime() === startDate.getTime() && state[0].endDate?.getTime() === endDate.getTime()) {
            setDisabled(true);
        } else if (!state[0].startDate || !state[0].endDate) {
            setDisabled(true);
        } else {
            setDisabled(false);
        }

        if (state[0].startDate) {
            $(function () {
                const ele = document.getElementsByClassName('rdrDateInput')[5]?.childNodes[0];
                ele?.removeAttribute('disabled');
                ele?.setAttribute('readonly', '');
                ele?.classList.remove('rdrDisabled')
            })
        } else if (!state[0].startDate) {
            $(function () {
                const ele = document.getElementsByClassName('rdrDateInput')[5]?.childNodes[0];
                ele?.removeAttribute('readonly');
                ele?.setAttribute('disabled', '');
                ele?.classList.add('rdrDisabled')
            })
        }

    }, [state[0].startDate, state[0].endDate]);

    const clearDates = (e) => {
        e.preventDefault()

        setFocusedRange([0, 0]);
        setSelectDates('');
        setNights('Select dates');

        setState([
            {
                startDate: null,
                endDate: null,
                key: 'selection'
            }
        ]);
    };

    const updateBooking = (e) => {
        e.preventDefault();
    }


    return (
        loading ?
            <div className='booking-edit-modal-content'>
                <label className='check-in-label'></label>
                <label className='check-out-label'></label>
                <div className='select-dates-edit'>
                    {nights}
                    <span>{selectDates}</span>
                </div>
                <div className='calendar-edit-container'>
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

                    <div className='calendar-edit-btn-container'>
                        <button disabled={disabled} className={disabled ? 'save-disabled' : 'save-btn'} onClick={updateBooking} >Save</button>
                        <div>
                        <button className='clear-btn' onClick={clearDates}>Clear dates</button>
                        <button className='close-btn' onClick={() => setShowModal(false)}>Close</button>
                        </div>
                    </div>
                </div>

            </div>
            :
            <Loading />
    )
}

export default BookingEditForm;
