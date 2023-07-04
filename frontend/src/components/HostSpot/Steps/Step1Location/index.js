import { useEffect, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { parseAddress } from './parseAddress';
import LocationAlert from './LocationAlert';
import locationPing from '../../../../images/location.svg';
import clearX from '../../../../images/clear-x-thick.svg';
import './Step1Location.css';

const Step1Location = ({ address, setAddress, city, setCity, state, setState, zipcode, setZipcode, country, setCountry }) => {

    const [inputVal, setInputVal] = useState('');
    const [alert, setAlert] = useState(false);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {

        function waitForElement(querySelector, timeout = 0) {
            const startTime = new Date().getTime();
            return new Promise((resolve, reject) => {
                const timer = setInterval(() => {
                    const now = new Date().getTime();
                    if (document.querySelector(querySelector)) {
                        clearInterval(timer);
                        resolve();
                    } else if (timeout && now - startTime >= timeout) {
                        clearInterval(timer);
                        reject();
                    }
                }, 100);
            });
        }

        if (loaded) {
            waitForElement(".pac-container", 3000).then(function () {
                const autocompleteElement = document.getElementsByClassName('pac-container')[0];
                const manualElement = document.createElement('div');
                const manualText = document.createTextNode('Enter address manually');

                // create onclick to change google step and remove it after unmount

                manualElement.className = 'pac-manual';
                manualElement.appendChild(manualText);
                autocompleteElement.appendChild(manualElement);

                const newParent = document.getElementsByClassName('host-step-1-location-main')[0];
                newParent.appendChild(autocompleteElement);
            }).catch(() => {
                setLoaded(false);
            });
        }
    }, [loaded])

    useEffect(() => {
        const loader = new Loader({
            apiKey: process.env.REACT_APP_GOOGLE_PLACES_API,
            version: 'weekly',
            libraries: ['places']
        });

        loader.importLibrary('maps').then(async ({ Map }) => {
            // const { Map } = await window.google.maps.importLibrary('maps');
            const { Autocomplete } = await window.google.maps.importLibrary('places');

            const map = new Map(document.getElementById('step-1-map'), {
                center: { lat: 38.483378, lng: -109.681333 },
                zoom: 12,
                gestureHandling: 'none',
                zoomControl: false,
                streetViewControl: false,
                fullscreenControl: false,
                mapTypeControl: false,
                keyboardShortcuts: false,
            });

            const autocomplete = new Autocomplete(document.getElementById('step-1-autocomplete'), {
                componentRestrictions: { country: 'us' },
                fields: ['address_components', 'geometry'],
            });

            autocomplete.addListener("place_changed", () => {
                const place = autocomplete.getPlace();

                if (!place.geometry || !place.geometry.location) {
                    // User entered the name of a Place that was not suggested and
                    // pressed the Enter key, or the Place Details request failed.
                    // window.alert("No details available for input: '" + place.name + "'");
                    setAlert(true);
                    return;
                };

                const addressDetails = parseAddress(place);

                setAddress(addressDetails['address']);
                setCity(addressDetails['locality']);
                setState(addressDetails['administrative_area_level_1']);
                setZipcode(addressDetails['postal_code']);
                setCountry(addressDetails['country']);

                map.fitBounds(place.geometry.viewport);
                map.setCenter(place.geometry.location);
            });

            setLoaded(true);
        });

        return () => {
            const elements = document.getElementsByClassName('pac-container');

            if (elements[0]) {
                elements[0].remove()
            }
        }
    }, []);


    return (
        <>
            <div className='host-step-1-location-container'>
                <div className='host-step-1-location-container-inner'>
                    <div className='host-step-1-location-top'>
                        <h1 className='host-step-1-location-header'>Where's your court located?</h1>
                        <div className='host-step-1-location-subheader'>
                            Your address is only shared with guests after they've made a reservation.
                        </div>
                    </div>
                    <div className='host-step-1-location-bottom'>
                        <div className='host-step-1-location-main'>
                            <div className='step-1-autocomplete-container' onClick={() => document.getElementById('step-1-autocomplete').focus()}>
                                <div className='step-1-locator-box'>
                                    <img className='step-1-locator' src={locationPing} alt='locator ping' />
                                </div>
                                <input id='step-1-autocomplete' type='text' value={inputVal} onChange={(e) => setInputVal(e.target.value)} placeholder='Enter your address' />
                                {inputVal &&
                                    <button className='step-1-clear-box' onClick={() => setInputVal('')}>
                                        <img style={{ width: '12px', height: '12px' }} src={clearX} alt='x button' />
                                    </button>
                                }
                            </div>
                            <div className='step-1-autocomplete-overlay' />
                            <div id='step-1-map'></div>
                        </div>
                    </div>
                </div>
                <LocationAlert alert={alert} setAlert={setAlert} />
            </div>
        </>
    );
};

export default Step1Location;
