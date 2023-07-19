import { useEffect, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { parseAddress } from './parseAddress';
import locationPing from '../../../../images/location.svg';
import clearX from '../../../../images/clear-x-thick.svg';
import '../Steps.css';
import './Step1Location.css';

const Step1Location = ({
    setLocationStep, setAddress, setCity, setState, setZipcode,
    setCountry, lat, lng, setLat, setLng }) => {

    const [inputVal, setInputVal] = useState('');
    const [loaded, setLoaded] = useState(false);
    const [initialLat, ] = useState(lat);
    const [initialLng, ] = useState(lng);

    useEffect(() => {
        let manualElement;

        const handleManualClick = () => {
            setLocationStep((prev) => prev + 1);
        };

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
        };

        if (loaded) {
            waitForElement(".pac-container", 3000).then(function () {
                const autocompleteElement = document.getElementsByClassName('pac-container')[0];
                manualElement = document.createElement('div');
                const manualText = document.createTextNode('Enter address manually');

                manualElement.addEventListener('mousedown', handleManualClick);

                manualElement.className = 'pac-manual';
                manualElement.appendChild(manualText);
                autocompleteElement.appendChild(manualElement);

                const newParent = document.getElementsByClassName('host-step-1-location-main')[0];
                newParent.appendChild(autocompleteElement);
            }).catch(() => {
                setLoaded(false);
            });
        };

        return () => {
            if (manualElement) {
                manualElement.removeEventListener('mousedown', handleManualClick);
            };
        };
    }, [loaded, setLocationStep]);

    useEffect(() => {
        let autocomplete;

        const loader = new Loader({
            apiKey: process.env.REACT_APP_GOOGLE_PLACES_API,
            version: 'weekly',
            libraries: ['places', 'geocoding']
        });

        loader.importLibrary('maps').then(async ({ Map }) => {
            const { Autocomplete } = await window.google.maps.importLibrary('places');

            const hideFeatures = [
                {
                    featureType: "poi",
                    elementType: "labels",
                    stylers: [{ visibility: "off" }]
                },
                {
                    featureType: "administrative",
                    elementType: "labels",
                    stylers: [{ fontWeight: 'normal' }]
                },
                {
                    featureType: "administrative",
                    elementType: "labels.text.fill",
                    stylers: [{ color: '#818181' }]
                },
                {
                    featureType: "road.local",
                    elementType: "labels",
                    stylers: [{ visibility: "off" }]
                },
                {
                    featureType: "road.arterial",
                    elementType: "labels",
                    stylers: [{ visibility: "off" }]
                },
                {
                    featureType: "road.highway",
                    elementType: "labels",
                    stylers: [{ visibility: "off" }]
                },
                {
                    featureType: "road.highway",
                    elementType: "geometry.fill",
                    stylers: [{ color: "#FFFFFF" }]
                },
                {
                    featureType: "road.highway",
                    elementType: "geometry.stroke",
                    stylers: [{ color: "#C0C0C0" }]
                },
                {
                    featureType: "transit",
                    elementType: "labels.icon",
                    stylers: [{ visibility: "off" }],
                }
            ];

            const hideFeaturesMapType = new window.google.maps.StyledMapType(hideFeatures, { name: "HIDE FEATS" });

            const map = new Map(document.getElementById('step-1-map'), {
                center: { lat: initialLat, lng: initialLng },
                zoom: 12,
                gestureHandling: 'none',
                zoomControl: false,
                streetViewControl: false,
                fullscreenControl: false,
                mapTypeControl: false,
                keyboardShortcuts: false,
                clickableIcons: false,
                mapTypeControlOptions: {
                    mapTypeIds: [window.google.maps.MapTypeId.ROADMAP, 'hide_feats']
                }
            });

            map.mapTypes.set('hide_feats', hideFeaturesMapType);
            map.setMapTypeId('hide_feats');

            // Warning:
            // In react strict mode, use effects trigger twice on initial render,
            // autocomplete will make 2 pac-containers making one show out of place
            // as is it not handled by the function relocating it.
            // will not occur in production.
            autocomplete = new Autocomplete(document.getElementById('step-1-autocomplete'), {
                componentRestrictions: { country: ['us', 'ca'] },
                fields: ['address_components', 'geometry'],
            });

            autocomplete.addListener("place_changed", () => {
                const place = autocomplete.getPlace();

                if (!place.geometry || !place.geometry.location) {
                    // User entered the name of a Place that was not suggested and
                    // pressed the Enter key, or the Place Details request failed.
                    // window.alert("No details available for input: '" + place.name + "'");
                    return;
                };

                const addressDetails = parseAddress(place);

                setAddress(addressDetails['address']);
                setCity(addressDetails['locality']);
                setState(addressDetails['administrative_area_level_1']);
                setZipcode(addressDetails['postal_code']);
                setCountry(addressDetails['country']);
                setLat(addressDetails['lat']);
                setLng(addressDetails['lng']);

                setLocationStep((prev) => prev + 1);
            });

            setLoaded(true);
        });

        return () => {
            if (autocomplete) {
                window.google.maps.event.clearListeners(autocomplete, 'place_changed');
            };

            const elements = document.getElementsByClassName('pac-container');

            if (elements[0]) {
                elements[0].remove();
            };
        };
    }, [initialLat, initialLng, setAddress, setCity, setCountry, setLat, setLng, setLocationStep, setState, setZipcode]);


    return (
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
        </div>
    );
};

export default Step1Location;
