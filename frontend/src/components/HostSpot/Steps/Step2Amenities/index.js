import { useState } from 'react';
import basketball from '../../../../images/amenities/basketball.svg';
import wifi from '../../../../images/amenities/wifi.svg';
import lockerRoom from '../../../../images/amenities/locker-room.svg';
import airConditioning from '../../../../images/amenities/air-conditioning.svg';
import freeParking from '../../../../images/amenities/free-parking.svg';
import paidParking from '../../../../images/amenities/paid-parking.svg';
import scoreboard from '../../../../images/amenities/scoreboard.svg';
import scorersTable from '../../../../images/amenities/scorers-table.svg';
import referee from '../../../../images/amenities/referee.svg';
import './Step2Amenities.css';

const Step2Amenities = ({ amenities, setAmenities }) => {

    const [delayed,] = useState(500);
    // can dispatch info from table once created and replace manual method.
    // since images are static, not updated or uploaded, and miniscule traffic, this method is alright.
    const [basicAmenities,] = useState([['Basketball', basketball], ['Wifi', wifi], ['Locker room', lockerRoom],
        ['Air conditioning', airConditioning], ['Free parking on premises', freeParking], ['Paid parking on premises', paidParking],
        ['Scoreboard', scoreboard], ['Dedicated scorers table', scorersTable]]);

    const handleClick = (value) => {
        if (amenities.has(value)) {
            setAmenities(prev => {
                prev.delete(value);
                return new Set(prev);
            });
        } else {
            setAmenities(prev => new Set(prev.add(value)));
        };
    };


    return (
        <div className='step-2-amenities-container'>
            <div className='step-2-amenities-container-inner'>
                <div className='step-2-amenities-top'>
                    <h1 className='step-2-amenities-header'>Tell guests what your court has to offer</h1>
                    <div className='step-2-amenities-subheader'>You can add more amenities after you publish your listing.</div>
                </div>
                <div className='step-2-amenities-bottom'>
                    {basicAmenities.map((option, i) => (
                        <div key={option[0]} className='step-2-amenities-main' style={{ animationDelay: `${delayed * (1.00 + (.11 - .0027 * i) * i)}ms` }}>
                            <button className={amenities.has(option[0]) ? 'step-2-amenities-btn-checked' : 'step-2-amenities-btn'} onClick={() => handleClick(option[0])}>
                                <div style={{ height: '45px' }}>
                                    <img src={option[1]} alt='icon' />
                                </div>
                                <div className='step-2-amenities-text'>{option[0]}</div>
                            </button>
                        </div>
                    ))}
                    <div className='standout-header'>Do you have any standout amenities?</div>
                </div>
            </div>
        </div>
    );
};

export default Step2Amenities;
