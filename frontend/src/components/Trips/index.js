import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './Trips.css';

const Trips = () => {



    return (
        <div className='trips-container'>
            <h1 className='trips-header'>Trips</h1>
            <div>
                Trips Content
            </div>
            <div>
                Where you've been
            </div>
        </div>
    )
}

export default Trips;
