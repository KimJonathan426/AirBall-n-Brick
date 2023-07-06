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

    // use effect logic to change header enlarge and shrink class if there is an input or not


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
                                        <div className='location-confirm-header-text'>Country / Region</div>
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
                            <div className='location-confirm-combined-container'>
                                <div className='location-confirm-combined-item-1'>
                                    <label className='location-confirm-combined' htmlFor='street'>
                                        <div className={address ? 'location-confirm-header-shrink' : 'location-confirm-header-enlarge'}>
                                            <div className='location-confirm-header-text'>Street address</div>
                                        </div>
                                        <input id='street' value={address} onChange={(e) => setAddress(e.target.value)} />
                                    </label>
                                </div>
                                <div className='location-confirm-combined-item-2'>
                                    <label className='location-confirm-combined' htmlFor='city'>
                                        <div className={city ? 'location-confirm-header-shrink' : 'location-confirm-header-enlarge'}>
                                            <div className='location-confirm-header-text'>City</div>
                                        </div>
                                        <input id='city' value={city} onChange={(e) => setCity(e.target.value)} />
                                    </label>
                                </div>
                                <div className='location-confirm-combined-item-3'>
                                    <label className='location-confirm-combined' htmlFor='state'>
                                        <div className={state ? 'location-confirm-header-shrink' : 'location-confirm-header-enlarge'}>
                                            <div className='location-confirm-header-text'>State</div>
                                        </div>
                                        <input id='state' value={state} onChange={(e) => setState(e.target.value)} />
                                    </label>
                                </div>
                                <div className='location-confirm-combined-item-4'>
                                    <label className='location-confirm-combined' htmlFor='zipcode'>
                                        <div className={zipcode ? 'location-confirm-header-shrink' : 'location-confirm-header-enlarge'}>
                                            <div className='location-confirm-header-text'>Zipcode</div>
                                        </div>
                                        <input id='zipcode' value={zipcode} onChange={(e) => setZipcode(e.target.value)} />
                                    </label>
                                </div>
                                <div className='location-confirm-border-1' />
                                <div className='location-confirm-border-2' />
                                <div className='location-confirm-border-3' />
                            </div>
                        </div>
                        <div id='step-1-confirm-map'></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LocationConfirm;
