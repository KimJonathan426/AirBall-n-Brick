import { useEffect } from 'react';
import './Step1Location.css';
import './LocationConfirm.css';

const LocationConfirm = ({
    locationStep, setLocationStep,
    address, setAddress,
    city, setCity,
    state, setState,
    zipcode, setZipcode,
    country, setCountry }) => {


    return (
        <div className='host-step-1-location-container'>
            <div className='host-step-1-location-container-inner'>
                <div className='host-step-1-location-top'>
                    <h1 className='host-step-1-location-header'>Confirm your address</h1>
                    <div className='host-step-1-location-subheader'>
                        Your address is only shared with guests after they've made a reservation.
                    </div>
                </div>
                <div className='host-step-1-location-bottom'>
                    <div className='host-step-1-location-main'>
                        <div>
                            <div className='location-confirm-country-container'>
                                <label className='location-confirm-country' htmlFor='countryCode'>
                                    <div className='location-confirm-header-shrink'>
                                        <div className='location-confirm-country-header-text'>Country / Region</div>
                                    </div>
                                    <select id='countryCode' value={country} onChange={(e) => setCountry(e.target.value)}>
                                        <option value='United States' className='country-code-option'>
                                            United States - US
                                        </option>
                                        <option value='Canada' className='country-code-option'>
                                            Canada - CA
                                        </option>
                                    </select>
                                </label>
                            </div>
                            <div></div>
                        </div>
                        <div id='step-1-confirm-map'></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LocationConfirm;
