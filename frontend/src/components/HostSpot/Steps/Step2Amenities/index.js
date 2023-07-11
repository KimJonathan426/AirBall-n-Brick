import { useState } from 'react';
import basketball from '../../../../images/amenities/basketball.svg';
import wifi from '../../../../images/amenities/wifi.svg';
import water from '../../../../images/amenities/water.svg';
import airConditioning from '../../../../images/amenities/air-conditioning.svg';
import freeParking from '../../../../images/amenities/free-parking.svg';
import paidParking from '../../../../images/amenities/paid-parking.svg';
import bench from '../../../../images/amenities/bench.svg';
import lighting from '../../../../images/amenities/lighting.svg';
import lockerRoom from '../../../../images/amenities/locker-room.svg';
import scoreboard from '../../../../images/amenities/scoreboard.svg';
import scorersTable from '../../../../images/amenities/scorers-table.svg';
import referee from '../../../../images/amenities/referee.svg';
import pool from '../../../../images/amenities/pool.svg';
import hotTub from '../../../../images/amenities/hot-tub.svg';
import shower from '../../../../images/amenities/shower.svg';
import exerciseEquipment from '../../../../images/amenities/exercise-equipment.svg';
import bbqGrill from '../../../../images/amenities/bbq-grill.svg';
import outdoorDining from '../../../../images/amenities/outdoor-dining.svg';
import playground from '../../../../images/amenities/playground.svg';
import smokeAlarm from '../../../../images/amenities/smoke-alarm.svg';
import firstAid from '../../../../images/amenities/first-aid.svg';
import fireExtinguisher from '../../../../images/amenities/fire-extinguisher.svg';
import tape from '../../../../images/amenities/tape.svg';
import './Step2Amenities.css';

const Step2Amenities = ({ amenities, setAmenities }) => {

    const [delayed,] = useState(500);
    // can dispatch info from table once created and replace manual method.
    // since images are static, not updated or uploaded, and miniscule traffic, this method is alright.
    const [basicAmenities,] = useState([['Basketball', basketball], ['Wifi', wifi], ['Water', water],
    ['Air conditioning', airConditioning], ['Free parking on premises', freeParking], ['Paid parking on premises', paidParking],
    ['Benches / Bleachers', bench], ['Lighting', lighting]]);

    const [standoutAmenities,] = useState([['Locker room', lockerRoom], ['Scoreboard', scoreboard],
    ['Dedicated scorers table', scorersTable], ['Referee', referee], ['Pool', pool],
    ['Hot tub', hotTub], ['Shower', shower], ['Exercise equipment', exerciseEquipment],
    ['BBQ grill', bbqGrill], ['Outdoor dining area', outdoorDining], ['Playground', playground]]);

    const [safetyAmenities,] = useState([['Smoke alarm', smokeAlarm], ['First aid kit', firstAid],
    ['Fire extinguisher', fireExtinguisher], ['Kinesio tape', tape]])

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
                <div>
                    <div className='step-2-amenities-bottom'>
                        {basicAmenities.map((option, i) => (
                            <div key={option[0]} className='step-2-amenities-main' style={{ animationDelay: `${delayed * (1.00 + (.065 - .002 * i) * i)}ms` }}>
                                <button className={amenities.has(option[0]) ? 'step-2-amenities-btn-checked' : 'step-2-amenities-btn'} onClick={() => handleClick(option[0])}>
                                    <div style={{ height: '45px' }}>
                                        <img src={option[1]} alt='icon' />
                                    </div>
                                    <div className='step-2-amenities-text'>{option[0]}</div>
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className='step-2-amenities-list-header standout-amenities' style={{ animationDelay: '700ms' }}>
                        Do you have any standout amenities?
                    </div>
                    <div className='step-2-amenities-bottom'>
                        {standoutAmenities.map((option, i) => (
                            <div key={option[0]} className='step-2-amenities-main' style={{ animationDelay: `${delayed * (1.00 + (.065 - .002 * i) * (i + 7))}ms` }}>
                                <button className={amenities.has(option[0]) ? 'step-2-amenities-btn-checked' : 'step-2-amenities-btn'} onClick={() => handleClick(option[0])}>
                                    <div style={{ height: '45px' }}>
                                        <img src={option[1]} alt='icon' />
                                    </div>
                                    <div className='step-2-amenities-text'>{option[0]}</div>
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className='step-2-amenities-list-header' style={{ animationDelay: '885ms' }}>
                        Do you have any of these safety items?
                    </div>
                    <div className='step-2-amenities-bottom'>
                        {safetyAmenities.map((option, i) => (
                            <div key={option[0]} className='step-2-amenities-main' style={{ animationDelay: `${delayed * (1.00 + (.065 - .002 * i) * (i + 12))}ms` }}>
                                <button className={amenities.has(option[0]) ? 'step-2-amenities-btn-checked' : 'step-2-amenities-btn'} onClick={() => handleClick(option[0])}>
                                    <div style={{ height: '45px' }}>
                                        <img src={option[1]} alt='icon' />
                                    </div>
                                    <div className='step-2-amenities-text'>{option[0]}</div>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Step2Amenities;
