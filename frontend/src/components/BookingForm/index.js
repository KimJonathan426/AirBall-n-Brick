import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRange } from 'react-date-range';
import { useState } from 'react';
import './BookingForm.css';

const BookingForm = () => {


    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: null,
            key: 'selection'
        }
    ]);


    return (
        <>
            <DateRange
                className='calendar'
                editableDateInputs={true}
                onChange={item => setState([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={state}
                minDate={new Date()}
            />
            <form>


            </form>
        </>
    )
}

export default BookingForm;
