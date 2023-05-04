import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const HostingReservations = () => {
    return (
        <div className='hosting-reservations-container'>
            <div className='hosting-reservations-main'>
                <div className='reservation-header'>
                    Your reservations
                </div>
            </div>
        </div>
    )
}

export default HostingReservations;
